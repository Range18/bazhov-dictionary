import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import { Word } from './entities/word.entity';
import { WordExample } from './entities/word-example.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Word, WordExample])],
  controllers: [WordsController],
  providers: [WordsService],
})
export class WordsModule {}
