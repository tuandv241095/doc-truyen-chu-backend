import { Module } from '@nestjs/common';
import { DatabaseFileService } from './databaseFile.service';
import { DatabaseFileController } from './databaseFile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseFile } from './entities/databaseFile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DatabaseFile])],
  exports: [DatabaseFileService],
  controllers: [DatabaseFileController],
  providers: [DatabaseFileService],
})
export class DatabaseFileModule {}
