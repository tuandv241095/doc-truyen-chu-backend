import { Review } from 'src/reviews/entities/review.entity';
import { getRepository } from 'typeorm';
import { randomInterval, randomText } from '../RandomText';

export const createReview = async (
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

  const subreviews =
    level == 3 ? 0 : randomInterval(-5, 5) <= 0 ? 0 : randomInterval(1, 5);
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
        total: angry + dislike + sad + haha + like + love + wow,
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
  for (let i = 0; i < subreviews; i++) {
    await createReview(res.id, userId, storyId, level + 1);
  }
  return res;
};
