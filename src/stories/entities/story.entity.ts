import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Story {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  views: number;
}
