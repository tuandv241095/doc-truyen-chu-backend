import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookMarkDto } from './dto/createBookMark.dto';
import { UpdateBookMarkDto } from './dto/updateBookMark.dto';
import { BookMark } from './entities/bookMark.entity';

@Injectable()
export class BookMarkService {
  constructor(
    @InjectRepository(BookMark)
    private bookMarkRepository: Repository<BookMark>,
  ) {}

  create(createBookMarkDto: CreateBookMarkDto) {
    return 'This action adds a new bookMark';
  }

  async findAll(limit?: number, offset?: number, userId?: string) {
    const count = await this.bookMarkRepository.count({
      where: {
        userId: userId,
      },
    });
    const bookMarks = await this.bookMarkRepository.find({
      where: {
        userId: userId,
      },
      relations: {
        story: true,
      },
      skip: offset,
      take: limit,
      cache: true,
    });

    return {
      bookMarks,
      count,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} bookMark`;
  }

  update(id: number, updateBookMarkDto: UpdateBookMarkDto) {
    return `This action updates a #${id} bookMark`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookMark`;
  }
}
