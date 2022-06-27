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
export class VoteUp {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @RelationId((voteUp: VoteUp) => voteUp.story)
  @Column({ nullable: true })
  storyId: string;

  @ManyToOne(
    () => Story,
    (story: Story) => story.voteUps,
  )
  story: Story;

  @RelationId((voteUp: VoteUp) => voteUp.user)
  @Column({ nullable: true })
  userId: string;

  @ManyToOne(
    () => User,
    (user: User) => user.voteUps,
  )
  user: User;
}
