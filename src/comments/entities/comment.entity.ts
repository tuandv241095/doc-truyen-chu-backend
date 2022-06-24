import { Story } from 'src/stories/entities/story.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: string;

  @RelationId((comment: Comment) => comment.story)
  storyId: string;

  @ManyToOne(
    () => Story,
    (story: Story) => story.comments,
  )
  story: Story;
}
