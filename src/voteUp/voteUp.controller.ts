import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VoteUpService } from './voteUp.service';
import { CreateVoteUpDto } from './dto/createVoteUp.dto';
import { UpdateVoteUpDto } from './dto/updateVoteUp.dto';

@Controller('vote-up')
export class VoteUpController {
  constructor(private readonly voteUpService: VoteUpService) {}

  @Post()
  create(@Body() createVoteUpDto: CreateVoteUpDto) {
    return this.voteUpService.create(createVoteUpDto);
  }

  @Get()
  findAll() {
    return this.voteUpService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voteUpService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVoteUpDto: UpdateVoteUpDto) {
    return this.voteUpService.update(+id, updateVoteUpDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.voteUpService.remove(+id);
  }
}
