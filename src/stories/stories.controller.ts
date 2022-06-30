import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { StoriesService } from './stories.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { StoryQuery } from './dto/storyQuery';

@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Post()
  create(@Body() createStoryDto: CreateStoryDto) {
    return this.storiesService.create(createStoryDto);
  }

  @Get()
  findAll(@Query() q: StoryQuery) {
    return this.storiesService.findAll(
      q.offset,
      q.limit,
      q.sortBy,
      q.keyword,
      q.categories,
      q.status,
      q.worldViews,
      q.personalities,
      q.sex,
      q.style,
      q.author,
      q.converter,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storiesService.findOne(+id);
  }
}
