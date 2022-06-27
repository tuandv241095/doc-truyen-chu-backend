import { Story } from 'src/stories/entities/story.entity';
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
import { CommentBody } from 'src/comments/entities/commentBody.interface';
import { Feedback } from 'src/comments/entities/feedback.interface';
import { React } from 'src/react/entities/react.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'int', default: 1 })
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

  @Column({ type: 'float', nullable: true })
  starRate: number;

  @RelationId((review: Review) => review.story)
  @Column({ nullable: true })
  storyId: string;

  @ManyToOne(
    () => Story,
    (story: Story) => story.reviews,
  )
  story: Story;

  @RelationId((review: Review) => review.user)
  @Column({ nullable: true })
  userId: string;

  @ManyToOne(
    () => User,
    (user: User) => user.comments,
  )
  user: User;

  @RelationId((review: Review) => review.parentReview)
  @Column({ nullable: true })
  parentReviewId: string;

  @ManyToOne(
    () => Review,
    review => review.subreviews,
  )
  parentReview: Review;

  @OneToMany(
    () => Review,
    review => review.parentReview,
  )
  subreviews: Review[];

  @OneToMany(
    () => React,
    react => react.review,
  )
  reacts: React[];
}
