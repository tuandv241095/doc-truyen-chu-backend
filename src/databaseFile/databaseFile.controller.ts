import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  StreamableFile,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { Readable } from 'stream';
import { DatabaseFileService } from './databaseFile.service';

@Controller('database-file')
@UseInterceptors(ClassSerializerInterceptor)
export class DatabaseFileController {
  constructor(private readonly databaseFileService: DatabaseFileService) {}

  @Get(':id')
  async getDatabaseFileById(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const file = await this.databaseFileService.getFileById(id);

    const stream = Readable.from(file.data);
    console.log(stream);

    response.set({
      'Content-Disposition': `inline; filename="${file.fileName}"`,
      'Content-Type': 'image/jpeg',
    });

    return new StreamableFile(stream);
  }
}
