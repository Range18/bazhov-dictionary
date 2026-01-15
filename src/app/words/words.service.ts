import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Word } from './entities/word.entity';
import { WordQueryDto } from './dto/word-query.dto';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import {WordNotFoundException} from "../../core/exceptions";

@Injectable()
export class WordsService {
  constructor(
      @InjectRepository(Word)
      private readonly repo: Repository<Word>,
  ) {}

  async create(dto: CreateWordDto): Promise<Word> {
    const entity = this.repo.create({
      word: dto.word,
      wordWithAccent: dto.wordWithAccent,
      description: dto.description,
      exampleText: dto.exampleText,
      ...(dto.taleId ? { tale: { id: dto.taleId } } : {}),
    });

    return this.repo.save(entity);
  }

  async findAll(query: WordQueryDto) {
    const qb = this.repo
        .createQueryBuilder('w')
        .leftJoinAndSelect('w.tale', 't');

    if (query.tale) {
      qb.andWhere('t.slug = :slug', { slug: query.tale });
    }

    if (query.search) {
      qb.andWhere('(w.word ILIKE :s OR w.wordWithAccent ILIKE :s)', { s: `%${query.search}%` });
    }

    if (query.byLetter) {
      qb.andWhere('w.word ILIKE :p', { p: `${query.byLetter}%` });
    }

    return qb.orderBy('w.word', 'ASC').getMany();
  }

  async findOne(id: string): Promise<Word> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: { tale: true },
    });

    if (!entity) {
      throw new WordNotFoundException();
    }

    return entity;
  }

  async update(id: string, dto: UpdateWordDto): Promise<Word> {
    const entity = await this.repo.findOne({ where: { id }, relations: { tale: true } });
    if (!entity) {
      throw new WordNotFoundException();
    }

    if (dto.word !== undefined) entity.word = dto.word;
    if (dto.wordWithAccent !== undefined) entity.wordWithAccent = dto.wordWithAccent;
    if (dto.description !== undefined) entity.description = dto.description;
    if (dto.exampleText !== undefined) entity.exampleText = dto.exampleText;

    if (dto.taleId !== undefined) {
      entity.tale = dto.taleId ? ({ id: dto.taleId } as any) : null;
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
