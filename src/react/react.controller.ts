import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReactService } from './react.service';
import { CreateReactDto } from './dto/create-react.dto';
import { UpdateReactDto } from './dto/update-react.dto';

@Controller('react')
export class ReactController {
  constructor(private readonly reactService: ReactService) {}

  @Post()
  create(@Body() createReactDto: CreateReactDto) {
    return this.reactService.create(createReactDto);
  }

  @Get()
  findAll() {
    return this.reactService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reactService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReactDto: UpdateReactDto) {
    return this.reactService.update(+id, updateReactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reactService.remove(+id);
  }
}
