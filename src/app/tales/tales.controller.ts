import { Controller, Get, Param, Query } from '@nestjs/common';
import { TalesService } from './tales.service';
import { ApiTags } from '@nestjs/swagger';
import { TaleQueryDto } from './dto/tale-query.dto';
import { TaleRdo } from './rdo/tale.rdo';

@ApiTags('Tales')
@Controller('tales')
export class TalesController {
  constructor(private readonly talesService: TalesService) {}

  @Get()
  async findAll(@Query() query: TaleQueryDto): Promise<TaleRdo[]> {
    return this.talesService.formatToRdo(
      await this.talesService.findAll(query),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TaleRdo> {
    return this.talesService.formatToRdo(await this.talesService.findOne(id));
  }
}
