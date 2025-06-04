import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Tale } from './entities/tale.entity';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { TaleNotFoundException } from '../../core/exceptions';
import { BaseEntityService } from '../../core/base/base-entity.service';
import { TaleRdo } from './rdo/tale.rdo';
import { TaleQueryDto } from './dto/tale-query.dto';

@Injectable()
export class TalesService extends BaseEntityService<TaleRdo> {
  constructor(
    @InjectRepository(Tale)
    private readonly taleRepository: Repository<Tale>,
  ) {
    super(TaleRdo);
  }

  $findAll(options: FindManyOptions<Tale>) {
    return this.taleRepository.find(options);
  }

  $findOne(options: FindOneOptions<Tale>) {
    return this.taleRepository.findOne(options);
  }

  async findAll(query: TaleQueryDto) {
    const tales = await this.$findAll({
      where: { name: query.search },
      relations: { words: true },
    });

    if (query.search && tales.length === 0) {
      throw new TaleNotFoundException();
    }

    return tales;
  }

  async findOne(id: string) {
    const tale = await this.$findOne({ where: { id } });

    if (!tale) {
      throw new TaleNotFoundException();
    }

    return tale;
  }
}
