import { Module } from '@nestjs/common';
import { TaleImagesService } from './tale-images.service';
import { TaleImagesController } from './tale-images.controller';
import {TaleImage} from "./entities/tale-image.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([TaleImage])],
  controllers: [TaleImagesController],
  providers: [TaleImagesService]
})
export class TaleImagesModule {}
