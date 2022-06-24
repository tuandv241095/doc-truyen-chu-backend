import { WorldView } from 'src/worldView/entities/worldView.entity';
import { getRepository } from 'typeorm';
import data from './worldView.json';

export async function worldViewSeeding() {
  for (const worldView of data) {
    if (
      !(await getRepository(WorldView).findOne({
        where: { slug: worldView.slug },
      }))
    ) {
      const worldViewEntity = getRepository(WorldView).create(worldView);
      await getRepository(WorldView).save(worldViewEntity);
    }
  }
}
