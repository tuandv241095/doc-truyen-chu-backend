import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseFile } from './entities/databaseFile.entity';

@Injectable()
export class DatabaseFileService {
  constructor(
    @InjectRepository(DatabaseFile)
    private databaseFilesRepository: Repository<DatabaseFile>,
  ) {}

  async uploadDatabaseFile(dataBuffer: Buffer, fileName: string) {
    const newFile = await this.databaseFilesRepository.create({
      fileName,
      data: dataBuffer,
    });
    await this.databaseFilesRepository.save(newFile);
    return newFile;
  }

  async getFileById(fileId: string) {
    const file = await this.databaseFilesRepository.findOne(fileId);
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }
}
