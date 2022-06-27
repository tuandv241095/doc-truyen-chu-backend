import { Chapter } from 'src/chapters/entities/chapter.entity';
import { User } from 'src/users/entities/user.entity';
import { getRepository } from 'typeorm';
import { getMultipleRandom, randomInterval, randomText } from '../RandomText';
import { createCounterView } from './createCounterView';

export const createChapter = async (
  chapNumber: number,
  storyId: string,
): Promise<Chapter> => {
  const userList = (await getRepository(User).find()).map(i => i.id.toString());
  if (
    !(await getRepository(Chapter).findOne({
      where: { number: chapNumber, storyId: storyId },
    }))
  ) {
    let content: '';
    for (let i = 0; i < 2; i++) {
      content += randomText(1, randomInterval(15, 50), false) + '.\\n';
    }
    const chapter = {
      content: content,
      countText: content.split(' ').length,
      number: chapNumber,
      title: randomText(1, randomInterval(2, 8), false),
      storyId: storyId,
    };

    const chapterEntity = getRepository(Chapter).create(chapter);
    const res = await getRepository(Chapter).save(chapterEntity);
    for (const userId of getMultipleRandom(userList, randomInterval(1, 10))) {
      createCounterView(res.id, userId);
    }
    return res;
  } else {
    return null;
  }
};
