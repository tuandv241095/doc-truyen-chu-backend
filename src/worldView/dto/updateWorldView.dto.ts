import { PartialType } from '@nestjs/mapped-types';
import { CreateWorldViewDto } from './createWorldView.dto';

export class UpdateWorldViewDto extends PartialType(CreateWorldViewDto) {}
