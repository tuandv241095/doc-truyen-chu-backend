import { ReactType } from 'src/react/entities/reactType.enum';
import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/users/entities/user.entity';
import { getRepository } from 'typeorm';
import { getOneRandom, randomInterval, randomText } from '../RandomText';
import { createReact } from './createReact';

export const createReview = async (
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
  const reviewWeight =
    level === 1
      ? randomInterval(5, 10) / 10
      : level === 2
      ? randomInterval(3, 5) / 30
      : randomInterval(1, 3) / 100;

  const angry = randomInterval(
    0,
    Math.floor(weight * levelWeight * reviewWeight),
  );
  const dislike = randomInterval(
    0,
    Math.floor(weight * levelWeight * reviewWeight),
  );
  const sad = randomInterval(
    0,
    Math.floor(weight * levelWeight * reviewWeight),
  );
  const haha = randomInterval(
    0,
    Math.floor(2 * weight * levelWeight * reviewWeight),
  );
  const like = randomInterval(
    0,
    Math.floor(5 * weight * levelWeight * reviewWeight),
  );
  const love = randomInterval(
    0,
    Math.floor(5 * weight * levelWeight * reviewWeight),
  );
  const wow = randomInterval(
    0,
    Math.floor(2 * weight * levelWeight * reviewWeight),
  );
  const total = angry + dislike + sad + haha + like + love + wow;
  const subreviews =
    level === 3
      ? 0
      : level === 2
      ? randomInterval(-9, 1) <= 0
        ? 0
        : randomInterval(1, 5)
      : randomInterval(-2, 1) <= 0
      ? 0
      : randomInterval(1, 5);
  const review = {
    body: {
      text: randomText(p, p * randomInterval(16, 32), false),
    },
    feedback: {
      reviews: subreviews,
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
    parentReviewId: parentId,
    storyId: storyId,
    userId: userId,
    starRate: level == 1 ? Math.random() + randomInterval(3, 4) : null,
  };
  const reviewEntity = getRepository(Review).create(review);
  const res = await getRepository(Review).save(reviewEntity);

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
    createReact(null, res.id, getOneRandom(userList), arrReactType[i]);
  }

  for (let i = 0; i < subreviews; i++) {
    await createReview(res.id, userId, storyId, level + 1, weight);
  }
  return res;
};
