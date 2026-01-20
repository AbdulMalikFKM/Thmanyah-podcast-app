// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Podcast } from './podcasts/podcast.entity';
import { PodcastsModule } from './podcasts/podcasts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // e.g., localhost or Supabase link
      port: 5432,
      username: 'postgres',
      password: '32147896',
      database: 'thmanyah_db',
      // entities: [Podcast],
      autoLoadEntities: true, // This automatically finds the 'Entity' files we will create
      synchronize: true, // PRO-TIP: Only for development! It creates the table automatically.
    }),
    TypeOrmModule.forFeature([Podcast]),
    PodcastsModule,
  ],
})
export class AppModule {}
