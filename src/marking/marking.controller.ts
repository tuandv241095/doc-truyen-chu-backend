import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarkingService } from './marking.service';
import { CreateMarkingDto } from './dto/create-marking.dto';
import { UpdateMarkingDto } from './dto/update-marking.dto';

@Controller('marking')
export class MarkingController {
  constructor(private readonly markingService: MarkingService) {}

  @Post()
  create(@Body() createMarkingDto: CreateMarkingDto) {
    return this.markingService.create(createMarkingDto);
  }

  @Get()
  findAll() {
    return this.markingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.markingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarkingDto: UpdateMarkingDto) {
    return this.markingService.update(+id, updateMarkingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.markingService.remove(+id);
  }
}
