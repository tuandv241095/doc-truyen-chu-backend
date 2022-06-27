import { Converter } from 'src/converter/entities/converter.entity';
import { getRepository } from 'typeorm';
import * as fs from 'fs';
import { join } from 'path';
import { getMultipleRandom, getOneRandom, randomInterval, randomText } from '../RandomText';
import { Story } from 'src/stories/entities/story.entity';
import { Category } from '../../../categories/entities/category.entity';
import { Personality } from 'src/personality/entities/personality.entity';
import { Sex } from 'src/sex/entities/sex.entity';
import { StoryStatus } from 'src/story-status/entities/story-status.entity';
import { Style } from 'src/style/entities/style.entity';
import { WorldView } from 'src/worldView/entities/worldView.entity';
import { Author } from 'src/authors/entities/author.entity';

export async function storiesSeeding() {
  const categoryList = (await getRepository(Category).find()).map((i) => i.id.toString());
  const PersonalityList = (await getRepository(Personality).find()).map((i) => i.id.toString());
  const sexList = (await getRepository(Sex).find()).map((i) => i.id.toString());
  const statusList = (await getRepository(StoryStatus).find()).map((i) => i.id.toString());
  const styleList= (await getRepository(Style).find()).map((i) => i.id.toString());
  const worldViewList = (await getRepository(WorldView).find()).map((i) => i.id.toString());
  const authorList = (await getRepository(Author).find()).map((i) => i.id.toString());
  const converterList = (await getRepository(Converter).find()).map((i) => i.id.toString());
  
  for (let i = 1; i <= 5; i++) {
    if (
      !(await getRepository(Story).findOne({
        where: { id: i },
      }))
    ) {
      const weight = randomInterval(1,10);
      const countBookMark = randomInterval((weight-1)*20,weight*20);
      const countChapter = randomInterval((weight-1)*200+1,weight*200);
      const countComment =randomInterval(Math.floor(countChapter*0.5), Math.floor(countChapter*2.5));
      const countReview = randomInterval(Math.floor(countChapter*0.1), Math.floor(countChapter*0.2));
      const countText = randomInterval(Math.floor(countChapter*2500), Math.floor(countChapter*5000));
      const countView = countChapter * randomInterval(20,500)+ randomInterval(1,500);
      const countVoteUp = Math.floor(countView/randomInterval(100,200));
      const starRate = Math.random()+randomInterval(3,4);

      const img = 'data:image/jpeg;base64,'+fs.readFileSync(
        join(process.cwd(), 'src/database/images/'+randomInterval(1,10).toString()+'.jpg'),
      ).toString('base64');
      

      const story = {
        name: randomText(1, randomInterval(2, 6), true),
        description: randomText(1, randomInterval(15, 25), false),
        counters: {
          countBookMark: countBookMark,
          countChapter: countChapter,
          countComment: countComment,
          countReview: countReview,
          countText:countText,
          countView: countView,
          countVoteUp: countVoteUp,
          starRate: starRate,
        },
        poster: {
          poster150: img,
          poster300: img,
          poster600: img,
        },
        author: (await getRepository(Author).findOne({
          where: { id: getOneRandom(authorList) },
        })),
        converter: (await getRepository(Converter).findOne({
          where: { id: getOneRandom(converterList) },
        })),
        categories: (await getRepository(Category).findByIds(getMultipleRandom(categoryList, randomInterval(1,2)))),
        personalities: (await getRepository(Personality).findByIds(getMultipleRandom(PersonalityList, randomInterval(1,3)))),
        sex: (await getRepository(Sex).findOne({
          where: { id: getOneRandom(sexList) },
        })),
        status: (await getRepository(StoryStatus).findOne({
          where: { id: getOneRandom(statusList) },
        })),
        style: (await getRepository(Style).findOne({
          where: { id: getOneRandom(styleList) },
        })),
        worldViews: (await getRepository(WorldView).findByIds(getMultipleRandom(worldViewList, randomInterval(1,2)))),
      };
      const storyEntity = getRepository(Story).create(story);
      await getRepository(Story).save(storyEntity);
    }else break;
  }
}
