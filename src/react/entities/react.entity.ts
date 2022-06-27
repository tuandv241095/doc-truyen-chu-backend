import { Comment } from 'src/comments/entities/comment.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { ReactType } from './reactType.enum';

@Entity()
export class React {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: 'enum',
    enum: ReactType,
    default: ReactType.Like,
  })
  type: ReactType;

  @RelationId((react: React) => react.comment)
  @Column({ nullable: true })
  commentId: string;

  @ManyToOne(
    () => Comment,
    comment => comment.reacts,
  )
  comment: Comment;

  @RelationId((react: React) => react.review)
  @Column({ nullable: true })
  reviewId: string;

  @ManyToOne(
    () => Review,
    review => review.reacts,
  )
  review: Review;

  @RelationId((react: React) => react.user)
  @Column({ nullable: true })
  userId: string;

  @ManyToOne(
    () => User,
    user => user.reacts,
  )
  user: User;
}
