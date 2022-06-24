import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DatabaseFileService } from 'src/databaseFile/databaseFile.service';
import { DatabaseFileModule } from 'src/databaseFile/databaseFile.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), DatabaseFileModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
