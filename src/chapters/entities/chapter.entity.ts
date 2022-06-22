import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Chapter {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  number: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  views: number;

  @Column()
  storyId: string;
}
