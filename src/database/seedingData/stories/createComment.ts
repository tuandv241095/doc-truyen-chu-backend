import { Comment } from 'src/comments/entities/comment.entity';
import { getRepository } from 'typeorm';
import { randomInterval, randomText } from '../RandomText';

export const createComment = async (
  parentId: string,
  userId: string,
  storyId: string,
  level: number,
) => {
  const p = Math.floor((Math.random() * 4) / 3) + 1;
  const angry = randomInterval(0, 15);
  const dislike = randomInterval(0, 15);
  const sad = randomInterval(0, 15);
  const haha = randomInterval(0, 30);
  const like = randomInterval(0, 100);
  const love = randomInterval(0, 50);
  const wow = randomInterval(0, 30);

  const subcomments =
    level == 3 ? 0 : randomInterval(-5, 5) <= 0 ? 0 : randomInterval(1, 5);
  const comment = {
    body: {
      text: randomText(p, p * randomInterval(8, 16), false),
    },
    feedback: {
      comments: subcomments,
      reactors: {
        angry: angry,
        dislike: dislike,
        sad: sad,
        haha: haha,
        like: like,
        love: love,
        wow: wow,
        total: angry + dislike + sad + haha + like + love + wow,
      },
    },
    level: level,
    parentCommentId: parentId,
    storyId: storyId,
    userId: userId,
  };
  const commentEntity = getRepository(Comment).create(comment);
  const res = await getRepository(Comment).save(commentEntity);

  for (let i = 0; i < subcomments; i++) {
    createComment(res.id, userId, storyId, level + 1);
  }
};
