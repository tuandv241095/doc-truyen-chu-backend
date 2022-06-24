import { PartialType } from '@nestjs/mapped-types';
import { CreateStoryStatusDto } from './create-story-status.dto';

export class UpdateStoryStatusDto extends PartialType(CreateStoryStatusDto) {}
