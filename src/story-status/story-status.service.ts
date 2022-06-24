import { Injectable } from '@nestjs/common';
import { CreateStoryStatusDto } from './dto/create-story-status.dto';
import { UpdateStoryStatusDto } from './dto/update-story-status.dto';

@Injectable()
export class StoryStatusService {
  create(createStoryStatusDto: CreateStoryStatusDto) {
    return 'This action adds a new storyStatus';
  }

  findAll() {
    return `This action returns all storyStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} storyStatus`;
  }

  update(id: number, updateStoryStatusDto: UpdateStoryStatusDto) {
    return `This action updates a #${id} storyStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} storyStatus`;
  }
}
