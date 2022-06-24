import { Story } from 'src/stories/entities/story.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  slug: string;

  @ManyToMany(
    () => Story,
    (story: Story) => story.categories,
  )
  stories: Story[];
}
