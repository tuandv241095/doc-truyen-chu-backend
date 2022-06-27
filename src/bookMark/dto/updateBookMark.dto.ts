import { PartialType } from '@nestjs/mapped-types';
import { CreateBookMarkDto } from './createBookMark.dto';

export class UpdateBookMarkDto extends PartialType(CreateBookMarkDto) {}
