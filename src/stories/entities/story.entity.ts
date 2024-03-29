import { Author } from 'src/authors/entities/author.entity';
import { BookMark } from 'src/bookMark/entities/bookMark.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Chapter } from 'src/chapters/entities/chapter.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Converter } from 'src/converter/entities/converter.entity';
import { Personality } from 'src/personality/entities/personality.entity';
import { Reading } from 'src/reading/entities/reading.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Sex } from 'src/sex/entities/sex.entity';
import { StoryStatus } from 'src/story-status/entities/story-status.entity';
import { Style } from 'src/style/entities/style.entity';
import { VoteUp } from 'src/voteUp/entities/voteUp.entity';
import { WorldView } from 'src/worldView/entities/worldView.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Counters } from './counters.interface';
import { Poster } from './poster.interface';

@Entity()
export class Story {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'jsonb',
  })
  poster: Poster;

  @ManyToOne(
    () => Converter,
    (converter: Converter) => converter.stories,
  )
  converter: Converter;

  @RelationId((story: Story) => story.converter)
  @Column({ nullable: true })
  converterId: string;

  @ManyToOne(
    () => Author,
    (author: Author) => author.stories,
  )
  author: Author;

  @RelationId((story: Story) => story.author)
  @Column({ nullable: true })
  authorId: string;

  // @Column({
  //   type: 'jsonb',
  // })
  // counters: Counters;
  @Column({type: "float"})
  starRate: number;
  @Column()
  countChapter: number;
  @Column()
  countView: number;
  @Column()
  countText: number;
  @Column()
  countBookMark: number;
  @Column()
  countReading: number;
  @Column()
  countVoteUp: number;
  @Column()
  countReview: number;
  @Column()
  countComment: number;

  @OneToMany(
    () => BookMark,
    (bookMark: BookMark) => bookMark.story,
  )
  bookMarks: BookMark[];

  @OneToMany(
    () => Reading,
    (reading: Reading) => reading.story,
  )
  readings: Reading[];

  @ManyToMany(
    () => Category,
    (category: Category) => category.stories,
  )
  @JoinTable()
  categories: Category[];

  @RelationId((story: Story) => story.categories)
  categoryIds: string[];

  @ManyToOne(
    () => StoryStatus,
    (storyStatus: StoryStatus) => storyStatus.stories,
  )
  status: StoryStatus;

  @RelationId((story: Story) => story.status)
  @Column({ nullable: true })
  statusId: string;

  @ManyToMany(
    () => WorldView,
    (worldView: WorldView) => worldView.stories,
  )
  @JoinTable()
  worldViews: WorldView[];

  @RelationId((story: Story) => story.worldViews)
  worldViewIds: string[];

  @ManyToMany(
    () => Personality,
    (personality: Personality) => personality.stories,
  )
  @JoinTable()
  personalities: Personality[];

  @RelationId((story: Story) => story.personalities)
  personalityIds: string[];

  @ManyToOne(
    () => Sex,
    (sex: Sex) => sex.stories,
  )
  sex: Sex;

  @RelationId((story: Story) => story.sex)
  @Column({ nullable: true })
  sexId: string;

  @ManyToOne(
    () => Style,
    (style: Style) => style.stories,
  )
  style: Style;

  @RelationId((story: Story) => story.style)
  @Column({ nullable: true })
  styleId: string;

  @OneToMany(
    () => Chapter,
    (chapter: Chapter) => chapter.story,
  )
  chapters: Chapter[];

  @RelationId((story: Story) => story.chapters)
  chapterIds: string[];

  @OneToMany(
    () => Comment,
    (comment: Comment) => comment.story,
  )
  comments: Comment[];

  @RelationId((story: Story) => story.comments)
  commentIds: string[];

  @OneToMany(
    () => Review,
    (review: Review) => review.story,
  )
  reviews: Review[];

  @RelationId((story: Story) => story.reviews)
  reviewIds: string[];

  @OneToMany(
    () => VoteUp,
    (voteUp: VoteUp) => voteUp.story,
  )
  voteUps: VoteUp[];

  @RelationId((story: Story) => story.voteUps)
  voteUpIds: string[];
}
