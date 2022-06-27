import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CounterViewService } from './counterView.service';
import { CreateCounterViewDto } from './dto/createCounterView.dto';
import { UpdateCounterViewDto } from './dto/updateCounterView.dto';

@Controller('counter-view')
export class CounterViewController {
  constructor(private readonly counterViewService: CounterViewService) {}

  @Post()
  create(@Body() createCounterDto: CreateCounterViewDto) {
    return this.counterViewService.create(createCounterDto);
  }

  @Get()
  findAll() {
    return this.counterViewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.counterViewService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCounterDto: UpdateCounterViewDto,
  ) {
    return this.counterViewService.update(+id, updateCounterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.counterViewService.remove(+id);
  }
}
