import { BookMark } from 'src/bookMark/entities/bookMark.entity';
import { getRepository } from 'typeorm';

export const createBookMark = async (storyId: string, userId: string) => {
  if (
    !(await getRepository(BookMark).findOne({
      where: { storyId: storyId, userId: userId },
    }))
  ) {
    const bookMark = {
      userId: userId,
      storyId: storyId,
    };

    const bookMarkEntity = getRepository(BookMark).create(bookMark);
    await getRepository(BookMark).save(bookMarkEntity);
  }
};
