import { CounterView } from 'src/counterView/entities/counterView.entity';
import { getRepository } from 'typeorm';

export async function createCounterView(chapterId: string, userId: string) {
  if (
    !(await getRepository(CounterView).findOne({
      where: { chapterId: chapterId, userId: userId },
    }))
  ) {
    const counterView = {
      userId: userId,
      chapterId: chapterId,
    };

    const counterViewEntity = getRepository(CounterView).create(counterView);
    await getRepository(CounterView).save(counterViewEntity);
  }
}
