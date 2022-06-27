import { Category } from 'src/categories/entities/category.entity';
import { getRepository } from 'typeorm';
import data from './categories.json';

export async function categorySeeding() {
  for (const category of data) {
    if (
      !(await getRepository(Category).findOne({
        where: { slug: category.slug },
      }))
    ) {
      const categoryEntity = getRepository(Category).create(category);
      await getRepository(Category).save(categoryEntity);
    }else break;
  }
}
