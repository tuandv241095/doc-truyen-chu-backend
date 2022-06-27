import { PartialType } from '@nestjs/mapped-types';
import { CreateCounterViewDto } from './createCounterView.dto';

export class UpdateCounterViewDto extends PartialType(CreateCounterViewDto) {}
