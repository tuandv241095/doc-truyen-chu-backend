import { User } from 'src/users/entities/user.entity';
import { getRepository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import data from './users.json';
import * as fs from 'fs';
import { join } from 'path';
import { randomInterval, randomText } from '../RandomText';

export async function usersSeeding() {
  for (let i = 1; i <= 50; i++) {
    if (
      !(await getRepository(User).findOne({
        where: { usernameOrEmail: 'accounttest' + i.toString() },
      }))
    ) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash('12345678', salt);
      const img =
        'data:image/jpeg;base64,' +
        fs
          .readFileSync(
            join(
              process.cwd(),
              'src/database/images/' +
                randomInterval(1, 60).toString() +
                '.jpg',
            ),
          )
          .toString('base64');
      const userEntity = getRepository(User).create({
        usernameOrEmail: 'accounttest' + i.toString(),
        name: randomText(1, randomInterval(2, 4), true),
        salt,
        password,
        photo: img,
      });
      await getRepository(User).save(userEntity);
    }
  }
}
