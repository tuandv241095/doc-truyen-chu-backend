import { Module } from '@nestjs/common';
import { WorldViewService } from './worldView.service';
import { WorldViewController } from './worldView.controller';

@Module({
  controllers: [WorldViewController],
  providers: [WorldViewService],
})
export class WorldViewModule {}
