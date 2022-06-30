import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, OrderByCondition, Repository } from 'typeorm';
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
    author?: string,
    converter?: string,
  ) {
    let order = {};
    let where: { [type: string]: any } = {};

    if (categories)
      where.categories = {
        id: In(categories.split('%')),
      };
    if (status)
      where.status = {
        id: status,
      };
    if (worldViews)
      where.worldViews = {
        id: In(worldViews.split('%')),
      };
    if (personalities)
      where.worldViews = {
        id: In(personalities.split('%')),
      };
    if (sex)
      where.sex = {
        id: sex,
      };
    if (style)
      where.style = {
        id: style,
      };
    if (author)
      where.author = {
        id: author,
      };
    if (converter)
      where.converter = {
        id: converter,
      };
    if (keyword) where.name = Like(`%${keyword}%`);

    if (sortBy) {
      switch (sortBy) {
        case SortBy.CountBookMark:
          order = {
            countBookMark: 'DESC',
          };
          break;
        case SortBy.CountChapter:
          order = {
            countChapter: 'DESC',
          };
          break;
        case SortBy.CountComment:
          order = {
            countComment: 'DESC',
          };
          break;
        case SortBy.CountReview:
          order = {
            countReview: 'DESC',
          };
          break;
        case SortBy.CountText:
          order = {
            countText: 'DESC',
          };
          break;
        case SortBy.Trending:
          order = {
            countReading: 'DESC',
          };
          break;
        case SortBy.View:
          order = {
            countView: 'DESC',
          };
          break;
        case SortBy.StarRate:
          order = {
            starRate: 'DESC',
          };
          break;
        case SortBy.VoteUp:
          order = {
            countVoteUp: 'DESC',
          };
          break;
      }
    }

    const count = await this.storyRepository.find({
      where,
      cache: true,
    });

    const stories = await this.storyRepository.find({
      relations: {
        categories: true,
        author: true,
      },
      where,
      order: {
        counters: {
          countBookMark: order,
        },
        id: 'ASC',
      },
      skip: offset,
      take: limit,
      cache: true,
    });

    return {
      stories,
      count,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} story`;
  }
}
