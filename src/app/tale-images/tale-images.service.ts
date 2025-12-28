import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaleImage } from './entities/tale-image.entity';
import { TaleImageNotFoundException } from '../../core/exceptions';

@Injectable()
export class TaleImagesService {
  constructor(
      @InjectRepository(TaleImage)
      private readonly repo: Repository<TaleImage>,
  ) {}

  async create(filename: string): Promise<TaleImage> {
    const entity = this.repo.create({ filename });
    return this.repo.save(entity);
  }

  async findAll(): Promise<TaleImage[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<TaleImage> {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new TaleImageNotFoundException();
    return entity;
  }

  async update(id: string, filename: string): Promise<TaleImage> {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new TaleImageNotFoundException();

    entity.filename = filename;
    return this.repo.save(entity);
  }

  async remove(id: string): Promise<{ deleted: true; id: string }> {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new TaleImageNotFoundException();

    await this.repo.remove(entity);
    return { deleted: true, id };
  }
}
