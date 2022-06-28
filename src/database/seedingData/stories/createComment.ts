import { Comment } from 'src/comments/entities/comment.entity';
import { ReactType } from 'src/react/entities/reactType.enum';
import { User } from 'src/users/entities/user.entity';
import { getRepository } from 'typeorm';
import { getOneRandom, randomInterval, randomText } from '../RandomText';
import { createReact } from './createReact';

export const createComment = async (
  parentId: string,
  userId: string,
  storyId: string,
  level: number,
  weight: number,
) => {
  const userList = (await getRepository(User).find()).map(i => i.id.toString());
  const p = Math.floor((Math.random() * 4) / 3) + 1;
  const levelWeight =
    level === 1
      ? randomInterval(0, 5) === 0
        ? 0
        : 0.5
      : level === 2
      ? randomInterval(0, 2) === 0
        ? 0.2
        : 0
      : randomInterval(0, 6) == 0
      ? 0.1
      : 0;

  const commentWeight =
    level === 1
      ? randomInterval(1, 7) / 10
      : level === 2
      ? randomInterval(1, 5) / 30
      : randomInterval(1, 2) / 100;

  const angry = randomInterval(
    0,
    Math.floor(weight * levelWeight * commentWeight),
  );
  const dislike = randomInterval(
    0,
    Math.floor(weight * levelWeight * commentWeight),
  );
  const sad = randomInterval(
    0,
    Math.floor(weight * levelWeight * commentWeight),
  );
  const haha = randomInterval(
    0,
    Math.floor(2 * weight * levelWeight * commentWeight),
  );
  const like = randomInterval(
    0,
    Math.floor(5 * weight * levelWeight * commentWeight),
  );
  const love = randomInterval(
    0,
    Math.floor(5 * weight * levelWeight * commentWeight),
  );
  const wow = randomInterval(
    0,
    Math.floor(2 * weight * levelWeight * commentWeight),
  );
  const total = angry + dislike + sad + haha + like + love + wow;

  const subcomments =
    level === 3
      ? 0
      : level === 2
      ? randomInterval(-9, 1) <= 0
        ? 0
        : randomInterval(1, 5)
      : randomInterval(-2, 1) <= 0
      ? 0
      : randomInterval(1, 5);
  const comment = {
    body: {
      text: randomText(p, p * randomInterval(10, 25), false),
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
        total: total,
      },
    },
    level: level,
    parentCommentId: parentId,
    storyId: storyId,
    userId: userId,
  };
  const commentEntity = getRepository(Comment).create(comment);
  const res = await getRepository(Comment).save(commentEntity);

  const repeat = (element: string, count: number) => Array(count).fill(element);

  const arrReactType = [
    ...repeat(ReactType.Angry, angry),
    ...repeat(ReactType.Dislike, dislike),
    ...repeat(ReactType.Haha, haha),
    ...repeat(ReactType.Like, like),
    ...repeat(ReactType.Love, love),
    ...repeat(ReactType.Sad, sad),
    ...repeat(ReactType.Wow, wow),
  ];

  for (let i = 0; i < arrReactType.length; i++) {
    createReact(res.id, null, getOneRandom(userList), arrReactType[i]);
  }

  for (let i = 0; i < subcomments; i++) {
    createComment(res.id, userId, storyId, level + 1, weight);
  }
};
