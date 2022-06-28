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
export class Reading {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  lastChap: number;

  @CreateDateColumn()
  createdAt: Date;

  @RelationId((reading: Reading) => reading.story)
  @Column({ nullable: true })
  storyId: string;

  @ManyToOne(
    () => Story,
    (story: Story) => story.bookMarks,
  )
  story: Story;

  @RelationId((reading: Reading) => reading.user)
  @Column({ nullable: true })
  userId: string;

  @ManyToOne(
    () => User,
    (user: User) => user.bookMarks,
  )
  user: User;
}
