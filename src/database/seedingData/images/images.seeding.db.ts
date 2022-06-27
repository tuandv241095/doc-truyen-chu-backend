import * as fs from 'fs';
import { join } from 'path';
import { DatabaseFile } from 'src/databaseFile/entities/databaseFile.entity';
import { getRepository } from 'typeorm';

export async function imagesSeeding() {
  fs.readdir(
    join(process.cwd(), 'src/database/images/'),
    async (err, fileNames) => {
      if (err) {
        console.log(err);
      }
      for (const fileName of fileNames) {
        if (
          !(await getRepository(DatabaseFile).findOne({
            where: { fileName: fileName },
          }))
        ) {
          const img =
            'data:image/jpeg;base64,' +
            fs
              .readFileSync(
                join(process.cwd(), 'src/database/images/' + fileName),
              )
              .toString('base64');
          const image = {
            fileName: fileName,
            type: 'image',
            base64: img,
          };
          const imageEntity = getRepository(DatabaseFile).create(image);
          const res = await getRepository(DatabaseFile).save(imageEntity);
        } else break;
      }
    },
  );
}
