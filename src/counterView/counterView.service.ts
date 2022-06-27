import { Injectable } from '@nestjs/common';
import { CreateCounterViewDto } from './dto/createCounterView.dto';
import { UpdateCounterViewDto } from './dto/updateCounterView.dto';

@Injectable()
export class CounterViewService {
  create(createCounterDto: CreateCounterViewDto) {
    return 'This action adds a new counter';
  }

  findAll() {
    return `This action returns all counters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} counter`;
  }

  update(id: number, updateCounterDto: UpdateCounterViewDto) {
    return `This action updates a #${id} counter`;
  }

  remove(id: number) {
    return `This action removes a #${id} counter`;
  }
}
