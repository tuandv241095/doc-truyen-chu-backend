import { Story } from 'src/stories/entities/story.entity';
import { CommentBody } from '../../../dist/comments/entities/commentBody';
import { Feedback } from '../../../dist/comments/entities/feedback.interface';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({type:"int",default: 1})
  level: number;

  @CreateDateColumn()
  created_at: Date;

  @Column({
    type: 'jsonb',
  })
  body: CommentBody;

  @Column({
    type: 'jsonb',
  })
  feedback: Feedback;

  @RelationId((comment: Comment) => comment.story)
  storyId: string;

  @ManyToOne(
    () => Story,
    (story: Story) => story.comments,
  )
  story: Story;

  @RelationId((comment: Comment) => comment.user)
  userId: string;

  @ManyToOne(
    () => User,
    (user: User) => user.comments,
  )
  user: User;

  @ManyToOne(() => Comment, comment => comment.subcomments)
  parentComment: Comment;

  @OneToMany(() => Comment, comment => comment.parentComment)
  subcomments: Comment[];
}
