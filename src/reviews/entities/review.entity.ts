import { Story } from 'src/stories/entities/story.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: string;

  @RelationId((review: Review) => review.story)
  storyId: string;

  @ManyToOne(
    () => Story,
    (story: Story) => story.reviews,
  )
  story: Story;
}
