import { Module } from '@nestjs/common';
import { StoryStatusService } from './story-status.service';
import { StoryStatusController } from './story-status.controller';

@Module({
  controllers: [StoryStatusController],
  providers: [StoryStatusService]
})
export class StoryStatusModule {}
