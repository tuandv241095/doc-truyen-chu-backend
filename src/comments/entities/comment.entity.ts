import { Story } from 'src/stories/entities/story.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { CommentBody } from './commentBody.interface';
import { Feedback } from './feedback.interface';
import { React } from 'src/react/entities/react.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'int', default: 1 })
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
  @Column({ nullable: true })
  storyId: string;

  @ManyToOne(
    () => Story,
    (story: Story) => story.comments,
  )
  story: Story;

  @RelationId((comment: Comment) => comment.user)
  @Column({ nullable: true })
  userId: string;

  @ManyToOne(
    () => User,
    (user: User) => user.comments,
  )
  user: User;

  @RelationId((comment: Comment) => comment.parentComment)
  @Column({ nullable: true })
  parentCommentId: string;

  @ManyToOne(
    () => Comment,
    comment => comment.subcomments,
  )
  parentComment: Comment;

  @OneToMany(
    () => Comment,
    comment => comment.parentComment,
  )
  subcomments: Comment[];

  @OneToMany(
    () => React,
    react => react.comment,
  )
  reacts: React[];
}
