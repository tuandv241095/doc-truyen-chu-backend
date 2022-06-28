import { React } from 'src/react/entities/react.entity';
import { ReactType } from 'src/react/entities/reactType.enum';
import { getRepository } from 'typeorm';

export async function createReact(
  commentId: string,
  reviewId: string,
  userId: string,
  type: ReactType,
) {
  if (commentId) {
    if (
      !(await getRepository(React).findOne({
        where: { commentId: commentId, userId: userId },
      }))
    ) {
      const react = {
        userId: userId,
        commentId: commentId,
      };

      const reactEntity = getRepository(React).create(react);
      await getRepository(React).save(reactEntity);
    }
  } else {
    if (
      !(await getRepository(React).findOne({
        where: { reviewId: reviewId, userId: userId },
      }))
    ) {
      const react = {
        type: type,
        userId: userId,
        reviewId: reviewId,
      };

      const reactEntity = getRepository(React).create(react);
      await getRepository(React).save(reactEntity);
    }
  }
}
