import { Injectable } from '@nestjs/common';
import { CreateVoteUpDto } from './dto/createVoteUp.dto';
import { UpdateVoteUpDto } from './dto/updateVoteUp.dto';

@Injectable()
export class VoteUpService {
  create(createVoteUpDto: CreateVoteUpDto) {
    return 'This action adds a new voteUp';
  }

  findAll() {
    return `This action returns all voteUp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} voteUp`;
  }

  update(id: number, updateVoteUpDto: UpdateVoteUpDto) {
    return `This action updates a #${id} voteUp`;
  }

  remove(id: number) {
    return `This action removes a #${id} voteUp`;
  }
}
