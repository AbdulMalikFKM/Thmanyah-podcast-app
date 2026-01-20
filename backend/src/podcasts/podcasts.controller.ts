import { Controller, Get, Param, Query } from '@nestjs/common';
import { PodcastsService } from './podcasts.service';

@Controller('podcasts') // This means all routes start with /podcasts
export class PodcastsController {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Get('search') // This makes the URL: /podcasts/search?term=...
  async search(@Query('term') term: string) {
    return await this.podcastsService.searchAndSave(term);
  }

  @Get('trending')
  async trending() {
    return await this.podcastsService.getTrending();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    console.log('Fetching Podcast with IDs:', id);
    return this.podcastsService.getPodcastWithEpisodes(id);
  }
}
