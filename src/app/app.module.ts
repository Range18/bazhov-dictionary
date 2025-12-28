import {Module, OnModuleInit} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordsModule } from './words/words.module';
import { TalesModule } from './tales/tales.module';
import { TaleImagesModule } from './tale-images/tale-images.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {databaseConfig, storageConfig, taleImagesStorageConfig} from '../core/configs';
import {ensureDir} from "../core/utils/ensure-dir";

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    WordsModule,
    TalesModule,
    TaleImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
   onModuleInit() {
    ensureDir(storageConfig.path);
    ensureDir(taleImagesStorageConfig.path);
  }
}
