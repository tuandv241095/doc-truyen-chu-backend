import { Converter } from 'src/converter/entities/converter.entity';
import { getRepository } from 'typeorm';
import * as fs from 'fs';
import { join } from 'path';
import {
  getMultipleRandom,
  getOneRandom,
  randomInterval,
  randomText,
} from '../RandomText';
import { Story } from 'src/stories/entities/story.entity';
import { Category } from '../../../categories/entities/category.entity';
import { Personality } from 'src/personality/entities/personality.entity';
import { Sex } from 'src/sex/entities/sex.entity';
import { StoryStatus } from 'src/story-status/entities/story-status.entity';
import { Style } from 'src/style/entities/style.entity';
import { WorldView } from 'src/worldView/entities/worldView.entity';
import { Author } from 'src/authors/entities/author.entity';
import { createComment } from './createComment';
import { User } from 'src/users/entities/user.entity';
import { createReview } from './createReview';
import { createBookMark } from './createBookMark';
import { createChapter } from './createChapter';
import { createVoteUp } from './createVoteUp';

export async function storiesSeeding() {
  const categoryList = (await getRepository(Category).find()).map(i =>
    i.id.toString(),
  );
  const PersonalityList = (await getRepository(Personality).find()).map(i =>
    i.id.toString(),
  );
  const sexList = (await getRepository(Sex).find()).map(i => i.id.toString());
  const statusList = (await getRepository(StoryStatus).find()).map(i =>
    i.id.toString(),
  );
  const styleList = (await getRepository(Style).find()).map(i =>
    i.id.toString(),
  );
  const worldViewList = (await getRepository(WorldView).find()).map(i =>
    i.id.toString(),
  );
  const authorList = (await getRepository(Author).find()).map(i =>
    i.id.toString(),
  );
  const converterList = (await getRepository(Converter).find()).map(i =>
    i.id.toString(),
  );
  const userList = (await getRepository(User).find()).map(i => i.id.toString());
  const userCount = userList.length / 10;

  for (let i = 1; i <= 10; i++) {
    if (
      !(await getRepository(Story).findOne({
        where: { id: i },
      }))
    ) {
      const img =
        'data:image/jpeg;base64,' +
        fs
          .readFileSync(
            join(
              process.cwd(),
              'src/database/images/' +
                randomInterval(1, 60).toString() +
                '.jpg',
            ),
          )
          .toString('base64');

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
          poster150: img,
          poster300: img,
          poster600: img,
        },
        author: await getRepository(Author).findOne({
          where: { id: getOneRandom(authorList) },
        }),
        converter: await getRepository(Converter).findOne({
          where: { id: getOneRandom(converterList) },
        }),
        categories: await getRepository(Category).findByIds(
          getMultipleRandom(categoryList, randomInterval(1, 2)),
        ),
        personalities: await getRepository(Personality).findByIds(
          getMultipleRandom(PersonalityList, randomInterval(1, 3)),
        ),
        sex: await getRepository(Sex).findOne({
          where: { id: getOneRandom(sexList) },
        }),
        status: await getRepository(StoryStatus).findOne({
          where: { id: getOneRandom(statusList) },
        }),
        style: await getRepository(Style).findOne({
          where: { id: getOneRandom(styleList) },
        }),
        worldViews: await getRepository(WorldView).findByIds(
          getMultipleRandom(worldViewList, randomInterval(1, 2)),
        ),
      };
      const storyEntity = getRepository(Story).create(story);
      const res = await getRepository(Story).save(storyEntity);
      const weight = randomInterval(1, 10);
      const countBookMark = randomInterval(
        (weight - 1) * userCount,
        weight * userCount,
      );
      const countChapter = randomInterval((weight - 1) * 20 + 1, weight * 20);
      const countComment = randomInterval(
        Math.floor((countChapter * weight) / 10),
        Math.floor((countChapter * weight) / 2),
      );
      const countReview = randomInterval(
        (weight - 1) * userCount,
        weight * userCount,
      );
      let countText = 0;
      let countView = 0;
      let countVoteUp = 0;
      let totalStar = 0;
      let starRate = 0;
      for (const userId of getMultipleRandom(userList, countBookMark)) {
        await createBookMark(res.id, userId);
      }
      for (let i = 1; i <= countChapter; i++) {
        const chapter = await createChapter(i, res.id);
        if (chapter) countText += chapter.countText;
      }

      for (let i = 0; i < countComment; i++) {
        await createComment(null, getOneRandom(userList), res.id, 1);
      }
      for (let i = 0; i < countReview; i++) {
        const review = await createReview(
          null,
          getOneRandom(userList),
          res.id,
          1,
        );
        if (review) totalStar += review.starRate;
      }
      starRate = totalStar / countReview;

      for (const userId of getMultipleRandom(
        userList,
        randomInterval(1, userList.length),
      )) {
        const count = randomInterval(1, 5);
        for (let i = 1; i <= count; i++) {
          createVoteUp(userId, res.id);
        }
        countVoteUp += count;
      }
      await getRepository(Story).update(res.id, {
        counters: {
          countBookMark: countBookMark,
          countChapter: countChapter,
          countComment: countComment,
          countReview: countReview,
          countText: countText,
          countView: countView,
          countVoteUp: countVoteUp,
          starRate: starRate,
        },
      });
    } else break;
  }
}
