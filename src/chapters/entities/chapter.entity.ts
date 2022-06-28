import { CounterView } from 'src/counterView/entities/counterView.entity';
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

@Entity()
export class Chapter {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  number: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  countText: number;

  @Column({ default: 0 })
  views: number;

  @RelationId((chapter: Chapter) => chapter.story)
  @Column({ nullable: true })
  storyId: string;

  @ManyToOne(
    () => Story,
    (story: Story) => story.chapters,
  )
  story: Story;

  @OneToMany(
    () => CounterView,
    (counterView: CounterView) => counterView.chapter,
  )
  counterViews: CounterView[];
}
