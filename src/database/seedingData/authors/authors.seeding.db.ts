import { Author } from 'src/authors/entities/author.entity';
import { getRepository } from 'typeorm';
import * as fs from 'fs';
import { join } from 'path';
import { randomInterval, randomText } from '../RandomText';

export async function authorSeeding() {
  for (let i = 1; i <= 50; i++) {
    if (
      !(await getRepository(Author).findOne({
        where: { id: i },
      }))
    ) {
      const author = {
        name: randomText(1, randomInterval(2, 6), true),
        description: randomText(1, randomInterval(15, 25), false),
      };
      const authorEntity = getRepository(Author).create(author);
      await getRepository(Author).save(authorEntity);
    } else break;
  }
}
