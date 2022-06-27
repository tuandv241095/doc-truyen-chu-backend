import { Module } from '@nestjs/common';
import { CounterViewService } from './counterView.service';
import { CounterViewController } from './counterView.controller';

@Module({
  controllers: [CounterViewController],
  providers: [CounterViewService],
})
export class CountersModule {}
