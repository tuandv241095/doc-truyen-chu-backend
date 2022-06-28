import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, In, OrderByCondition, Repository } from 'typeorm';
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
    const query = this.storyRepository.createQueryBuilder('story');
    if (categories) {
      query
        .leftJoin('story.categories', 'category')
        .andWhere('category.id IN(:...categories)', {
          categories: categories.split('%'),
        });
    }
    if (status) {
      query
        .leftJoin('story.status', 'status')
        .andWhere('status.id = :status', {
          status: status,
        });
    }
    if (worldViews) {
      query
        .leftJoin('story.worldViews', 'worldView')
        .andWhere('worldView.id IN(:...worldViews)', {
          worldViews: worldViews.split('%'),
        });
    }
    if (personalities) {
      query
        .leftJoin('story.personalities', 'personality')
        .andWhere('personality.id IN(:...personalities)', {
          personalities: personalities.split('%'),
        });
    }
    if (sex) {
      query.leftJoin('story.sex', 'sex').andWhere('sex.id = :sex', {
        sex: sex,
      });
    }
    if (style) {
      query.leftJoin('story.style', 'style').andWhere('style.id = :style', {
        style: style,
      });
    }
    if (keyword) {
      console.log(keyword);
      
      query.andWhere("story.name like :keyword", { keyword:`%${keyword}%` })
;
    }
    if (sortBy) {
      switch (sortBy) {
        case SortBy.CountBookMark:
          query.orderBy("story.countBookMark", "DESC")
          query.addOrderBy("story.id", "ASC")
          break;
        case SortBy.CountChapter:
          query.orderBy("story.countChapter", "DESC")
          query.addOrderBy("story.id", "ASC")
          break;
        case SortBy.CountComment:
          query.orderBy("story.countComment", "DESC")
          query.addOrderBy("story.id", "ASC")
          break;
        case SortBy.CountReview:
          query.orderBy("story.countReview", "DESC")
          query.addOrderBy("story.id", "ASC")
          break;
        case SortBy.CountText:
          query.orderBy("story.countText", "DESC")
          query.addOrderBy("story.id", "ASC")
          break;
        case SortBy.Trending:
          query.orderBy("story.countReading", "DESC")
          query.addOrderBy("story.id", "ASC")
          break;
        case SortBy.View:
          query.orderBy("story.countView", "DESC")
          query.addOrderBy("story.id", "ASC")
          break;
        case SortBy.StarRate:
          query.orderBy("story.starRate", "DESC")
          query.addOrderBy("story.id", "ASC")
          break;
        default: query.orderBy("story.id", "ASC")
      }
    }
    if(limit && offset) query.take(limit).skip(offset);
    // const res1 = this.storyRepository
    //           .createQueryBuilder('story')
    //           .leftJoin('story.categories', 'category')
    //           .where('category.id IN(:...categories)', {
    //               categories: categories.split('%'),
    //           })
    //           .orderBy("story.countBookMark","DESC")
    //           .addOrderBy("story.id", "ASC")
    //           .take(limit)
    //           .skip(offset)
    //           .getMany();

    const res = await query.getMany();
    return res;
  }

  findOne(id: number) {
    
    return `This action returns a #${id} story`;
  }
}
