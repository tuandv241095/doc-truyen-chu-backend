import { Personality } from 'src/personality/entities/personality.entity';
import { getRepository } from 'typeorm';
import data from './personalities.json';

export async function personalitySeeding() {
  for (const personality of data) {
    if (
      !(await getRepository(Personality).findOne({
        where: { slug: personality.slug },
      }))
    ) {
      const personalityEntity = getRepository(Personality).create(personality);
      await getRepository(Personality).save(personalityEntity);
    }else break;
  }
}
