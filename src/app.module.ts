import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { StoriesModule } from './stories/stories.module';
import { CommentsModule } from './comments/comments.module';
import { ChaptersModule } from './chapters/chapters.module';
import { AuthorsModule } from './authors/authors.module';
import { CategoriesModule } from './categories/categories.module';
import { CountersModule } from './counters/counters.module';
import { ConverterModule } from './converter/converter.module';
import { WorldViewModule } from './worldView/worldView.module';
import { PersonalityModule } from './personality/personality.module';
import { SexModule } from './sex/sex.module';
import { StoryStatusModule } from './story-status/story-status.module';
import { ReviewsModule } from './reviews/reviews.module';
import { StyleModule } from './style/style.module';
import { DatabaseFileModule } from './databaseFile/databaseFile.module';
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
    CategoriesModule,
    CountersModule,
    ConverterModule,
    WorldViewModule,
    PersonalityModule,
    SexModule,
    StoryStatusModule,
    ReviewsModule,
    StyleModule,
    DatabaseFileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
