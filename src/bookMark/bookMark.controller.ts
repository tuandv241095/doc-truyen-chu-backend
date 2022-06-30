import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BookMarkService } from './bookMark.service';
import { BookMarkQuery } from './dto/bookMarkQuery';
import { CreateBookMarkDto } from './dto/createBookMark.dto';
import { UpdateBookMarkDto } from './dto/updateBookMark.dto';

@Controller('bookMarks')
export class BookMarkController {
  constructor(private readonly bookMarkService: BookMarkService) {}

  @Post()
  create(@Body() createBookMarkDto: CreateBookMarkDto) {
    return this.bookMarkService.create(createBookMarkDto);
  }

  @Get()
  async findAll(@Query() q: BookMarkQuery) {
    return await this.bookMarkService.findAll(q.limit, q.offset, q.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookMarkService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookMarkDto: UpdateBookMarkDto,
  ) {
    return this.bookMarkService.update(+id, updateBookMarkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookMarkService.remove(+id);
  }
}
