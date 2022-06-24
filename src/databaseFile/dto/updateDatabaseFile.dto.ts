import { PartialType } from '@nestjs/mapped-types';
import { CreateDatabaseFileDto } from './createDatabaseFile.dto';

export class UpdateDatabaseFileDto extends PartialType(CreateDatabaseFileDto) {}
