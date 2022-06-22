import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Marking {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  storyId: string;
}
