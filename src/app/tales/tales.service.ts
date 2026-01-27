import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tale } from './entities/tale.entity';
import { TaleQueryDto } from './dto/tale-query.dto';
import { CreateTaleDto } from './dto/create-tale.dto';
import { UpdateTaleDto } from './dto/update-tale.dto';
import { TaleImage } from '../tale-images/entities/tale-image.entity';
import { TaleNotFoundException } from '../../core/exceptions';

@Injectable()
export class TalesService {
  constructor(
    @InjectRepository(Tale)
    private readonly repo: Repository<Tale>,
  ) {
  }

  async create(dto: CreateTaleDto): Promise<Tale> {
    const entity = this.repo.create({
      name: dto.name,
      slug: dto.slug,
      taleImage: dto.taleImageId
        ? ({ id: dto.taleImageId } as TaleImage)
        : null,
    });

    return this.repo.save(entity);
  }

  async findBySlug(slug: string): Promise<Tale> {
    const entity = await this.repo.findOne({
      where: { slug },
      relations: ['taleImage'],
    });

    if (!entity) {
      throw new TaleNotFoundException();
    }

    return entity;
  }

  async findAll(query: TaleQueryDto): Promise<{ data: Tale[]; count: number }> {
    const page = query.page;
    const limit = query.limit;
    const skip =
      page !== undefined && limit !== undefined
        ? (page - 1) * limit
        : undefined;

    const qb = this.repo
      .createQueryBuilder('t')
      .leftJoinAndSelect('t.taleImage', 'taleImage');

    if (query.search) {
      qb.andWhere('t.name ILIKE :s', { s: `%${query.search}%` });
    }

    const [data, count] = await qb
      .orderBy('t.name', 'ASC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return { data, count };
  }

  async findOne(id: string): Promise<Tale> {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) {
      throw new TaleNotFoundException();
    }
    return entity;
  }

  async update(id: string, dto: UpdateTaleDto): Promise<Tale> {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) {
      throw new TaleNotFoundException();
    }

    if (dto.name !== undefined) entity.name = dto.name;

    if (dto.slug !== undefined) entity.slug = dto.slug;

    if (dto.taleImageId !== undefined) {
      entity.taleImage = dto.taleImageId
        ? ({ id: dto.taleImageId } as TaleImage)
        : null;
    }

    return this.repo.save(entity);
  }

  async remove(id: string): Promise<{ deleted: true; id: string }> {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) {
      throw new TaleNotFoundException();
    }

    await this.repo.remove(entity);
    return { deleted: true, id };
  }
}
