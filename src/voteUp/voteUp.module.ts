import { Module } from '@nestjs/common';
import { VoteUpService } from './voteUp.service';
import { VoteUpController } from './voteUp.controller';

@Module({
  controllers: [VoteUpController],
  providers: [VoteUpService],
})
export class VoteUpModule {}
