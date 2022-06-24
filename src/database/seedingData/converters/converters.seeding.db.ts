import { Converter } from 'src/converter/entities/converter.entity';
import { getRepository } from 'typeorm';
import * as fs from 'fs';
import { join } from 'path';
import { randomInterval, randomText } from '../RandomText';

export async function converterSeeding() {
  for (let i = 1; i <= 600; i++) {
    if (
      !(await getRepository(Converter).findOne({
        where: { id: i },
      }))
    ) {
      const img = fs.readFileSync(
        join(process.cwd(), 'src/database/images/1.jpg'),
      );
      const base64 = img.toString('base64');
      const converter = {
        name: randomText(1, randomInterval(2, 6), true),
        description: randomText(1, randomInterval(15, 25), false),
        photo: 'data:image/jpeg;base64,' + base64,
      };
      const converterEntity = getRepository(Converter).create(converter);
      await getRepository(Converter).save(converterEntity);
    }
  }
}
