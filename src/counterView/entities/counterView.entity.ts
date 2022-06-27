import { Chapter } from 'src/chapters/entities/chapter.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CounterView {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  createAt: Date;

  @Column()
  chapterId: string;

  @ManyToOne(
    () => Chapter,
    chapter => chapter.counterViews,
  )
  chapter: Chapter;

  @ManyToOne(
    () => User,
    user => user.counterViews,
  )
  user: User;

  @Column()
  userId: string;
}
