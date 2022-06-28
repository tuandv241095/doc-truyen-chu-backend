import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderByCondition, Repository } from 'typeorm';
import { CreateStoryDto } from './dto/create-story.dto';
import { SortBy } from './dto/sortBy.enum';
import { Story } from './entities/story.entity';

@Injectable()
export class StoriesService {
  constructor(
    @InjectRepository(Story)
    private storyRepository: Repository<Story>,
  ) {}
  create(createStoryDto: CreateStoryDto) {
    return 'This action adds a new story';
  }

  async findAll(
    offset?: number,
    limit?: number,
    sortBy?: SortBy,
    keyword?: string,
    categories?: string,
    status?: string,
    worldViews?: string,
    personalities?: string,
    sex?: string,
    style?: string,
  ) {
    let order: OrderByCondition = {};
    if (sortBy) {
      switch (sortBy) {
        case SortBy.CountBookMark:
          order = {
            "counters->'countBookMark'": 'DESC',
          };
          break;
        case SortBy.CountChapter:
          order = {
            "counters->'countChapter'": 'DESC',
          };
          break;
        case SortBy.CountComment:
          order = {
            "counters->'countComment'": 'DESC',
          };
          break;
        case SortBy.CountReview:
          order = {
            "counters->'countReview'": 'DESC',
          };
          break;
        case SortBy.CountText:
          order = {
            "counters->'countText'": 'DESC',
          };
          break;
        case SortBy.Trending:
          order = {
            "counters->'countReading'": 'DESC',
          };
          break;
        case SortBy.View:
          order = {
            "counters->'countView'": 'DESC',
          };
          break;
        case SortBy.StarRate:
          order = {
            "counters->'starRate'": 'DESC',
          };
          break;
      }
    }
    const query = this.storyRepository.createQueryBuilder('stories');
    if (categories) {
      query
        .leftJoin('stories.categories', 'category')
        .andWhere('category.id IN(:...categories)', {
          categories: categories.split('%'),
        });
    }
    if (status) {
      query
        .leftJoin('stories.status', 'status')
        .andWhere('status.id = :status', {
          status: status,
        });
    }
    if (worldViews) {
      query
        .leftJoin('stories.worldViews', 'worldView')
        .andWhere('worldView.id IN(:...worldViews)', {
          worldViews: worldViews.split('%'),
        });
    }
    if (personalities) {
      query
        .leftJoin('stories.personalities', 'personality')
        .andWhere('personality.id IN(:...personalities)', {
          personalities: personalities.split('%'),
        });
    }
    if (sex) {
      query.leftJoin('stories.sex', 'sex').andWhere('sex.id = :sex', {
        sex: sex,
      });
    }
    if (style) {
      query.leftJoin('stories.style', 'style').andWhere('style.id = :style', {
        style: style,
      });
    }

    const res = await query
      .orderBy(order)
      .skip(offset)
      .limit(limit)
      .getMany();
    return res;
  }

  findOne(id: number) {
    return `This action returns a #${id} story`;
  }
}
