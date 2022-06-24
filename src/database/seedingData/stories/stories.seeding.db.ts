import { Converter } from 'src/converter/entities/converter.entity';
import { getRepository } from 'typeorm';
import * as fs from 'fs';
import { join } from 'path';
import { randomInterval, randomText } from '../RandomText';
import { Story } from 'src/stories/entities/story.entity';

export async function converterSeeding() {
  for (let i = 1; i <= 2000; i++) {
    if (
      !(await getRepository(Story).findOne({
        where: { id: i },
      }))
    ) {
      const img = fs.readFileSync(
        join(process.cwd(), 'src/database/images/1.jpg'),
      );
      const imgBase64 = img.toString('base64');
      const countCategory = randomInterval(1, 2);
      const countPeronality = randomInterval(1, 3);
      const countWorldView = randomInterval(1, 2);
      // const categoryIds =

      const story = {
        name: randomText(1, randomInterval(2, 6), true),
        description: randomText(1, randomInterval(15, 25), false),
        counters: {
          countBookMark: 0,
          countChapter: 0,
          countComment: 0,
          countReview: 0,
          countText: 0,
          countView: 0,
          countVoteUp: 0,
          starRate: 0,
        },
        poster: {
          poster150: '',
          poster300: '',
          poster600: '',
        },
        authorId: randomInterval(1, 200).toString(),
        converterId: randomInterval(1, 600).toString(),
        categoryIds: [],
        personalityIds: [],
        sexId: '',
        statusId: '',
        styleId: '',
        worldViewIds: [],
      };
      const storyEntity = getRepository(Story).create(story);
      await getRepository(Story).save(storyEntity);
    }
  }
}
