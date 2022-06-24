import { Sex } from 'src/sex/entities/sex.entity';
import { getRepository } from 'typeorm';
import data from './sex.json';

export async function sexSeeding() {
  for (const sex of data) {
    if (
      !(await getRepository(Sex).findOne({
        where: { slug: sex.slug },
      }))
    ) {
      const sexEntity = getRepository(Sex).create(sex);
      await getRepository(Sex).save(sexEntity);
    }
  }
}
