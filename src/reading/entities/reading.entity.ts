import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reading {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  notice: boolean;

  @Column()
  currentChapter: number;

  @Column()
  userId: string;

  @Column()
  storyId: string;
}
