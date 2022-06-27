import { VoteUp } from 'src/voteUp/entities/voteUp.entity';
import { getRepository } from 'typeorm';

export async function createVoteUp(userId: string, storyId: string) {
  const voteUp = {
    userId: userId,
    storyId: storyId,
  };

  const voteUpEntity = getRepository(VoteUp).create(voteUp);
  await getRepository(VoteUp).save(voteUpEntity);
}
