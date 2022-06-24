import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StoryStatusService } from './story-status.service';
import { CreateStoryStatusDto } from './dto/create-story-status.dto';
import { UpdateStoryStatusDto } from './dto/update-story-status.dto';

@Controller('story-status')
export class StoryStatusController {
  constructor(private readonly storyStatusService: StoryStatusService) {}

  @Post()
  create(@Body() createStoryStatusDto: CreateStoryStatusDto) {
    return this.storyStatusService.create(createStoryStatusDto);
  }

  @Get()
  findAll() {
    return this.storyStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storyStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoryStatusDto: UpdateStoryStatusDto) {
    return this.storyStatusService.update(+id, updateStoryStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storyStatusService.remove(+id);
  }
}
