import { Module } from '@nestjs/common';
import { ReactService } from './react.service';
import { ReactController } from './react.controller';

@Module({
  controllers: [ReactController],
  providers: [ReactService]
})
export class ReactModule {}
