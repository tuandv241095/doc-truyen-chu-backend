import { Module } from '@nestjs/common';
import { BookMarkService } from './bookMark.service';
import { BookMarkController } from './bookMark.controller';

@Module({
  controllers: [BookMarkController],
  providers: [BookMarkService],
})
export class BookMarkModule {}
