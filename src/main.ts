import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { categorySeeding } from './database/seedingData/tags/categories/categories.seeding.db';
import { personalitySeeding } from './database/seedingData/tags/personalities/personalities.seeding.db';
import { sexSeeding } from './database/seedingData/tags/sex/sex.seeding.db';
import { storyStatusSeeding } from './database/seedingData/tags/storyStatus/storyStatus.seeding.db';
import { styleSeeding } from './database/seedingData/tags/style/styles.seeding.db';
import { worldViewSeeding } from './database/seedingData/tags/worldView/worldView.seeding.db';
import { userSeeding } from './database/seedingData/users/user.seeding.db';
import path, { join } from 'path';
import { converterSeeding } from './database/seedingData/converters/converters.seeding.db';
import { authorSeeding } from './database/seedingData/authors/authors.seeding.db';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useStaticAssets(path.join(__dirname, '/../src/database/images'));
  await categorySeeding();
  await storyStatusSeeding();
  await sexSeeding();
  await personalitySeeding();
  await styleSeeding();
  await worldViewSeeding();
  await userSeeding();
  await converterSeeding();
  await authorSeeding();
  await app.listen(5000);
}
bootstrap();
