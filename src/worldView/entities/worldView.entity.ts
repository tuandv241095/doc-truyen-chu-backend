import { Story } from 'src/stories/entities/story.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WorldView {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @ManyToMany(
    () => Story,
    (story: Story) => story.worldViews,
  )
  stories: Story[];
}
