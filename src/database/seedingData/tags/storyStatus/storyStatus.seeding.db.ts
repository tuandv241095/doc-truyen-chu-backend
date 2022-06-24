import { StoryStatus } from 'src/story-status/entities/story-status.entity';
import { getRepository } from 'typeorm';
import data from './storyStatus.json';

export async function storyStatusSeeding() {
  for (const storyStatus of data) {
    if (
      !(await getRepository(StoryStatus).findOne({
        where: { slug: storyStatus.slug },
      }))
    ) {
      const storyStatusEntity = getRepository(StoryStatus).create(storyStatus);
      await getRepository(StoryStatus).save(storyStatusEntity);
    }
  }
}
