import { Module } from '@nestjs/common';
import { StyleService } from './style.service';
import { StyleController } from './style.controller';

@Module({
  controllers: [StyleController],
  providers: [StyleService]
})
export class StyleModule {}
