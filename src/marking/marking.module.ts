import { Module } from '@nestjs/common';
import { MarkingService } from './marking.service';
import { MarkingController } from './marking.controller';

@Module({
  controllers: [MarkingController],
  providers: [MarkingService]
})
export class MarkingModule {}
