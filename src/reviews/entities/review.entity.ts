import { Story } from 'src/stories/entities/story.entity';
import { CommentBody } from '../../../dist/comments/entities/commentBody.interface';
import { Feedback } from '../../../dist/comments/entities/feedback.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({type:"int",default: 1})
  level: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'jsonb',
  })
  body: CommentBody;

  @Column({
    type: 'jsonb',
  })
  feedback: Feedback;

  @Column({type:"int"})
  starRate: number

  @RelationId((review: Review) => review.story)
  storyId: string;

  @ManyToOne(
    () => Story,
    (story: Story) => story.reviews,
  )
  story: Story;

  @RelationId((review: Review) => review.user)
  userId: string;

  @ManyToOne(
    () => User,
    (user: User) => user.comments,
  )
  user: User;

  @ManyToOne(() => Review, review => review.subreviews)
  parentReview: Review;

  @OneToMany(() => Review, review => review.parentReview)
  subreviews: Review[];
}
