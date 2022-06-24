import { User } from 'src/users/entities/user.entity';
import { getRepository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import data from './users.json';
import * as fs from 'fs';
import { join } from 'path';

export async function userSeeding() {
  for (const user of data) {
    if (
      !(await getRepository(User).findOne({
        where: { usernameOrEmail: user.usernameOrEmail },
      }))
    ) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash(user.password, salt);
      const img = fs.readFileSync(
        join(process.cwd(), 'src/database/images/1.jpg'),
      );
      const base64 = img.toString('base64');
      const userEntity = getRepository(User).create({
        ...user,
        salt,
        password,
        photo: 'data:image/jpeg;base64,' + base64,
      });
      await getRepository(User).save(userEntity);
    }
  }
}
