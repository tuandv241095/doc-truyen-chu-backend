import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReadingDto } from './dto/create-reading.dto';
import { UpdateReadingDto } from './dto/update-reading.dto';
import { Reading } from './entities/reading.entity';

@Injectable()
export class ReadingService {
  constructor(
    @InjectRepository(Reading)
    private readingRepository: Repository<Reading>,
  ) {}

  create(createReadingDto: CreateReadingDto) {
    return 'This action adds a new reading';
  }

  async findAll(limit?: number, offset?: number, userId?: string) {
    const count = await this.readingRepository.count({
      where: {
        userId: userId,
      },
    });
    const readings = await this.readingRepository.find({
      where: {
        userId: userId,
      },
      relations: {
        story: true,
      },
      skip: offset,
      take: limit,
      cache: true,
    });

    return {
      readings,
      count,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} reading`;
  }

  update(id: number, updateReadingDto: UpdateReadingDto) {
    return `This action updates a #${id} reading`;
  }

  remove(id: number) {
    return `This action removes a #${id} reading`;
  }
}
