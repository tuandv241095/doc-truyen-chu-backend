import { Reading } from 'src/reading/entities/reading.entity';
import { getRepository } from 'typeorm';

export const createReading = async (
  storyId: string,
  userId: string,
  lastChap: number,
) => {
  const reading = await getRepository(Reading).findOne({
    where: { storyId: storyId, userId: userId },
  });
  if (!reading) {
    const reading = {
      lastChap: lastChap,
      userId: userId,
      storyId: storyId,
    };

    const readingEntity = getRepository(Reading).create(reading);
    await getRepository(Reading).save(readingEntity);
  } else {
    await getRepository(Reading).update(reading.id, {
      lastChap: lastChap,
    });
  }
};
