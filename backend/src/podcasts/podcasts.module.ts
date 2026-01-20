import { Module } from '@nestjs/common';
import { PodcastsController } from './podcasts.controller';
import { PodcastsService } from './podcasts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Podcast } from './podcast.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Podcast])], // This gives us access to the "Repository"
  controllers: [PodcastsController],
  providers: [PodcastsService],
})
export class PodcastsModule {}
