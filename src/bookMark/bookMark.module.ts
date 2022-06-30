import { Module } from '@nestjs/common';
import { BookMarkService } from './bookMark.service';
import { BookMarkController } from './bookMark.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookMark } from './entities/bookMark.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookMark])],
  controllers: [BookMarkController],
  providers: [BookMarkService],
})
export class BookMarkModule {}
