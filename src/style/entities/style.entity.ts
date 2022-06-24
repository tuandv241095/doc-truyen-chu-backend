import { Story } from 'src/stories/entities/story.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Style {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @OneToMany(
    () => Story,
    (story: Story) => story.style,
  )
  stories: Story[];
}
