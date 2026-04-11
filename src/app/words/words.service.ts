import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Word } from './entities/word.entity';
import { WordExample } from './entities/word-example.entity';
import { WordQueryDto } from './dto/word-query.dto';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import {WordNotFoundException} from "../../core/exceptions";

@Injectable()
export class WordsService {
  constructor(
      @InjectRepository(Word)
      private readonly repo: Repository<Word>,
      @InjectRepository(WordExample)
      private readonly examplesRepo: Repository<WordExample>,
  ) {}

  async create(dto: CreateWordDto): Promise<Word> {
    const entity = this.repo.create({
      word: dto.word,
      wordWithAccent: dto.wordWithAccent,
      description: dto.description,
      examples: dto.examples.map((e) =>
        this.examplesRepo.create({
          exampleText: e.exampleText,
          tale: { id: e.taleId },
        }),
      ),
    });

    return this.repo.save(entity);
  }

  async findAll(query: WordQueryDto): Promise<{ data: Word[]; count: number }> {
    const page = query.page;
    const limit = query.limit;
    const skip = page !== undefined && limit !== undefined ? (page - 1) * limit : undefined;

    const base = this.repo.createQueryBuilder('w');

    if (query.tale) {
      base.andWhere(
          `EXISTS (
            SELECT 1 FROM word_examples we
            INNER JOIN tales tl ON tl.id = we."taleId"
            WHERE we."wordId" = w.id AND tl.slug = :slug
          )`,
          { slug: query.tale },
      );
    }

    if (query.search) {
      base.andWhere('(w.word ILIKE :s OR w.wordWithAccent ILIKE :s)', { s: `%${query.search}%` });
    }

    if (query.byLetter) {
      base.andWhere('w.word ILIKE :p', { p: `${query.byLetter}%` });
    }

    const count = await base.getCount();

    const data = await base
        .clone()
        .leftJoinAndSelect('w.examples', 'ex')
        .leftJoinAndSelect('ex.tale', 't')
        .addSelect('w.word COLLATE "ru-RU-x-icu"', 'word_ru')
        .orderBy('word_ru', 'ASC')
        .skip(skip)
        .take(limit)
        .getMany();

    return { data, count };
  }

  async findOne(id: string): Promise<Word> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: { examples: { tale: true } },
    });

    if (!entity) {
      throw new WordNotFoundException();
    }

    return entity;
  }

  async update(id: string, dto: UpdateWordDto): Promise<Word> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: { examples: true },
    });
    if (!entity) {
      throw new WordNotFoundException();
    }

    if (dto.word !== undefined) entity.word = dto.word;
    if (dto.wordWithAccent !== undefined) entity.wordWithAccent = dto.wordWithAccent;
    if (dto.description !== undefined) entity.description = dto.description;

    if (dto.examples !== undefined) {
      if (entity.examples?.length) {
        await this.examplesRepo.remove(entity.examples);
      }
      entity.examples = dto.examples.map((e) =>
        this.examplesRepo.create({
          exampleText: e.exampleText,
          tale: { id: e.taleId },
        }),
      );
    }

    return this.repo.save(entity);
  }

  async remove(id: string): Promise<{ deleted: true; id: string }> {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) {
      throw new WordNotFoundException();
    }

    await this.repo.remove(entity);
    return { deleted: true, id };
  }
}
