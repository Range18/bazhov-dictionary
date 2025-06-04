import { Module } from '@nestjs/common';
import { TaleImagesService } from './tale-images.service';
import { TaleImagesController } from './tale-images.controller';

@Module({
  controllers: [TaleImagesController],
  providers: [TaleImagesService]
})
export class TaleImagesModule {}
