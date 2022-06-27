import { Story } from 'src/stories/entities/story.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity()
export class BookMark {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @RelationId((bookMark: BookMark) => bookMark.story)
  @Column({ nullable: true })
  storyId: string;

  @ManyToOne(
    () => Story,
    (story: Story) => story.bookMarks,
  )
  story: Story;

  @RelationId((bookMark: BookMark) => bookMark.user)
  @Column({ nullable: true })
  userId: string;

  @ManyToOne(
    () => User,
    (user: User) => user.bookMarks,
  )
  user: User;
}
