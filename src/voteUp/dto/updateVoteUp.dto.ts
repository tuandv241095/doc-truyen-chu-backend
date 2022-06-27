import { PartialType } from '@nestjs/mapped-types';
import { CreateVoteUpDto } from './createVoteUp.dto';

export class UpdateVoteUpDto extends PartialType(CreateVoteUpDto) {}
