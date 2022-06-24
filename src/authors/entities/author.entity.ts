import { Story } from 'src/stories/entities/story.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(
    () => Story,
    (story: Story) => story.author,
  )
  stories: Story[];
}
