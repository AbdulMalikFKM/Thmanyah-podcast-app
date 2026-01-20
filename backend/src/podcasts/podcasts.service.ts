import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Podcast } from './podcast.entity';
import axios from 'axios';
import Parser from 'rss-parser';

// --- TYPES FOR SAFETY ---
interface iTunesResult {
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl600: string;
  feedUrl: string;
  trackCount: number;
}

interface iTunesResponse {
  results: iTunesResult[];
}

// Added for Trending RSS response
interface iTunesRSSFeed {
  feed: {
    entry: Array<{
      id: { attributes: { 'im:id': string } };
      'im:name': { label: string };
      'im:artist': { label: string };
      'im:image': Array<{ label: string }>;
    }>;
  };
}

type PodcastItem = {
  itunes?: { duration?: string };
} & Parser.Item;

@Injectable()
export class PodcastsService {
  constructor(
    @InjectRepository(Podcast)
    private podcastRepository: Repository<Podcast>,
  ) {}

  private readonly parser = new Parser();

  async getPodcastWithEpisodes(id: string) {
    let podcast = await this.podcastRepository.findOne({
      where: { collectionId: id },
    });

    if (!podcast) {
      try {
        // FIX: Added <iTunesResponse> to axios call
        const lookup = await axios.get<iTunesResponse>(
          `https://itunes.apple.com/lookup?id=${id}`,
        );
        const res = lookup.data.results[0];

        if (!res)
          throw new NotFoundException('Podcast does not exist in iTunes');

        podcast = await this.podcastRepository.save({
          collectionId: res.collectionId.toString(),
          name: res.collectionName,
          artist: res.artistName,
          image: res.artworkUrl600,
          feedUrl: res.feedUrl,
          episodeCount: res.trackCount || 0,
        });
      } catch {
        // FIX: Removed unused 'error' variable
        throw new NotFoundException('Could not retrieve podcast metadata');
      }
    }

    try {
      const feed = await this.parser.parseURL(podcast.feedUrl);
      const episodes = feed.items.map((item: PodcastItem) => ({
        title: item.title,
        description: item.contentSnippet || item.content,
        pubDate: item.pubDate,
        audioUrl: item.enclosure?.url,
        duration: item.itunes?.duration || '00:00',
        link: item.link,
      }));

      return { ...podcast, episodes };
    } catch {
      return { ...podcast, episodes: [] };
    }
  }

  async searchAndSave(term: string) {
    const response = await axios.get<iTunesResponse>(
      `https://itunes.apple.com/search?term=${term}&entity=podcast`,
    );
    const results = response.data.results;

    const podcasts = results.map((item: iTunesResult) => ({
      collectionId: item.collectionId.toString(),
      name: item.collectionName,
      artist: item.artistName,
      image: item.artworkUrl600,
      feedUrl: item.feedUrl,
      episodeCount: item.trackCount || 0,
    }));

    await this.podcastRepository.upsert(podcasts, ['collectionId']);
    return podcasts;
  }

  async getTrending() {
    // FIX: Added <iTunesRSSFeed>
    const rssResponse = await axios.get<iTunesRSSFeed>(
      `https://itunes.apple.com/us/rss/toppodcasts/limit=10/json`,
    );

    const entries = rssResponse.data.feed.entry;
    const ids = entries.map((e) => e.id.attributes['im:id']).join(',');

    // FIX: Added <iTunesResponse>
    const detailsResponse = await axios.get<iTunesResponse>(
      `https://itunes.apple.com/lookup?id=${ids}`,
    );

    // FIX: Properly typed map return
    return entries.map((entry, index) => {
      const id = entry.id.attributes['im:id'];
      const detail = detailsResponse.data.results.find(
        (r) => r.collectionId.toString() === id,
      );

      return {
        collectionId: id,
        rank: index + 1,
        name: entry['im:name'].label,
        artist: entry['im:artist'].label,
        image: entry['im:image'][2].label.replace('100x100bb', '1000x1000bb'),
        episodeCount: detail?.trackCount || 0,
      };
    });
  }
}
