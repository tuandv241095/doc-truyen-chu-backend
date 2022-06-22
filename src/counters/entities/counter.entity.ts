import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Counter {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  chapterId: string;

  @Column()
  userId: string;
}
