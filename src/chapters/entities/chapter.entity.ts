import { Story } from 'src/stories/entities/story.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity()
export class Chapter {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  number: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  views: number;

  @RelationId((chapter: Chapter) => chapter.story)
  storyId: string;

  @ManyToOne(
    () => Story,
    (story: Story) => story.chapters,
  )
  story: Story;
}
