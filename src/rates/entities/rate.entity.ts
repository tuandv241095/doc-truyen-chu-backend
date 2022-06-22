import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rate {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  body: string;

  @Column()
  rate: number;

  @Column()
  factor1: number;

  @Column()
  factor2: number;

  @Column()
  factor3: number;

  @Column()
  userId: string;

  @Column()
  storyId: string;
}
