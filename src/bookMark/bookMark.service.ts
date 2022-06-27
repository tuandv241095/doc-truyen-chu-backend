import { Injectable } from '@nestjs/common';
import { CreateBookMarkDto } from './dto/createBookMark.dto';
import { UpdateBookMarkDto } from './dto/updateBookMark.dto';

@Injectable()
export class BookMarkService {
  create(createBookMarkDto: CreateBookMarkDto) {
    return 'This action adds a new bookMark';
  }

  findAll() {
    return `This action returns all bookMark`;
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
