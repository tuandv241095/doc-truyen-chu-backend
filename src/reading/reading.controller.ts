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
import { ReadingService } from './reading.service';
import { CreateReadingDto } from './dto/create-reading.dto';
import { UpdateReadingDto } from './dto/update-reading.dto';
import { ReadingQuery } from './dto/readingQuery';

@Controller('readings')
export class ReadingController {
  constructor(private readonly readingService: ReadingService) {}

  @Post()
  create(@Body() createReadingDto: CreateReadingDto) {
    return this.readingService.create(createReadingDto);
  }

  @Get()
  async findAll(@Query() q: ReadingQuery) {
    return await this.readingService.findAll(q.limit, q.offset, q.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.readingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReadingDto: UpdateReadingDto) {
    return this.readingService.update(+id, updateReadingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.readingService.remove(+id);
  }
}
