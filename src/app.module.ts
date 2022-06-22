import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { StoriesModule } from './stories/stories.module';
import { CommentsModule } from './comments/comments.module';
import { ChaptersModule } from './chapters/chapters.module';
import { AuthorsModule } from './authors/authors.module';
import { TagsModule } from './tags/tags.module';
import { CategoriesModule } from './categories/categories.module';
import { RatesModule } from './rates/rates.module';
import { ReadingModule } from './reading/reading.module';
import { MarkingModule } from './marking/marking.module';
import { CountersModule } from './counters/counters.module';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_SECRET: Joi.string().required(),
        FACEBOOK_CLIENT_ID: Joi.string().required(),
        FACEBOOK_SECRET: Joi.string().required(),
        GITHUB_CLIENT_ID: Joi.string().required(),
        GITHUB_SECRET: Joi.string().required(),
      }),
    }),
    AuthenticationModule,
    StoriesModule,
    CommentsModule,
    ChaptersModule,
    AuthorsModule,
    TagsModule,
    CategoriesModule,
    RatesModule,
    ReadingModule,
    MarkingModule,
    CountersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
