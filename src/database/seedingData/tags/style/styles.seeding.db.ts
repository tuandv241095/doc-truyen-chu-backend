import { Style } from 'src/style/entities/style.entity';
import { getRepository } from 'typeorm';
import data from './styles.json';

export async function styleSeeding() {
  for (const style of data) {
    if (
      !(await getRepository(Style).findOne({
        where: { slug: style.slug },
      }))
    ) {
      const styleEntity = getRepository(Style).create(style);
      await getRepository(Style).save(styleEntity);
    }
  }
}
