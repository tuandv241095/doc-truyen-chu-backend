import { Story } from 'src/stories/entities/story.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Converter {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    nullable: true,
    default:
      'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
  })
  photo: string;

  @OneToMany(
    () => Story,
    (story: Story) => story.converter,
  )
  stories: Story[];
}
