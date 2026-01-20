import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('podcasts')
export class Podcast {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  collectionId: string; // From iTunes: trackId or collectionId

  @Column()
  name: string; // From iTunes: collectionName

  @Column()
  artist: string; // From iTunes: artistName

  @Column({ type: 'text' })
  image: string; // From iTunes: artworkUrl600

  @Column({ nullable: true })
  feedUrl: string;

  @CreateDateColumn()
  createdAt: Date;
}
