import { Injectable } from '@nestjs/common';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { Word } from './entities/word.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { BaseEntityService } from '../../core/base/base-entity.service';
import { WordRdo } from './rdo/word.rdo';
import {
  WordNotFoundException,
  WordNotInExampleException,
} from '../../core/exceptions';
import { WordQueryDto } from './dto/word-query.dto';

@Injectable()
export class WordsService extends BaseEntityService<WordRdo> {
  constructor(
    @InjectRepository(Word)
    private readonly wordsRepository: Repository<Word>,
  ) {
    super(WordRdo);
  }

  $findAll(options: FindManyOptions<Word>) {
    return this.wordsRepository.find(options);
  }

  $findOne(options: FindOneOptions<Word>) {
    return this.wordsRepository.findOne(options);
  }

  async findAll(query: WordQueryDto) {
    const searchTerm = query.search ? `%${query.search}%` : '%%';
    const words = await this.$findAll({
      where: { word: Like(searchTerm) },
      order: { word: query.search ? undefined : 'ASC' },
    });

    return words.map((word) => {
      word.exampleText = this.boldWordInText(word);
      return word;
    });
  }

  async findOne(id: string) {
    const word = await this.$findOne({ where: { id } });

    if (!word) {
      throw new WordNotFoundException();
    }

    word.exampleText = this.boldWordInText(word);
    return word;
  }

  private boldWordInText(wordEntity: Word): string {
    const pattern = new RegExp(`\\b(${wordEntity.word})\\b`, 'gi');

    if (!pattern.test(wordEntity.exampleText)) {
      throw new WordNotInExampleException();
    }

    return wordEntity.exampleText.replace(pattern, '<strong>$1</strong>');
  }
}
