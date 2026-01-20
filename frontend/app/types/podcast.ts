export interface Episode {
  title: string;
  description: string;
  pubDate: string;
  audioUrl: string;
  duration: string;
  link?: string;
}

export interface Podcast {
  id?: number;
  collectionId: string;
  name: string;
  artist: string;
  image: string;
  feedUrl?: string;
  rank?: number; // Optional because only Trending has a rank
  episodeCount: number;
  episodes?: Episode[]; // Optional because Grid view doesn't have episodes loaded yet
}
