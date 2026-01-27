import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { TalesService } from './tales.service';
import { TaleQueryDto } from './dto/tale-query.dto';
import { TaleRdo } from './rdo/tale.rdo';
import { BaseEntityService } from '../../core/base/base-entity.service';
import { CreateTaleDto } from './dto/create-tale.dto';
import { UpdateTaleDto } from './dto/update-tale.dto';
import { ApiKeyGuard } from '../../core/decorator/api-key-guard.decorator';

@ApiTags('Tales')
@Controller('tales')
export class TalesController extends BaseEntityService<TaleRdo> {
  constructor(private readonly talesService: TalesService) {
    super(TaleRdo);
  }

  @Post()
  @ApiKeyGuard()
  @ApiOperation({ summary: 'Create tale' })
  @ApiOkResponse({ type: TaleRdo })
  @ApiBadRequestResponse({ description: 'Validation error' })
  async create(@Body() dto: CreateTaleDto): Promise<TaleRdo> {
    return this.formatToRdo(await this.talesService.create(dto));
  }

  @Get()
  @ApiOperation({ summary: 'Get tales list (search by name) with pagination' })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/TaleRdo' },
        },
        count: { type: 'number', example: 123 },
      },
    },
  })
  async findAll(
    @Query() query: TaleQueryDto,
  ): Promise<{ data: TaleRdo[]; count: number }> {
    const { data, count } = await this.talesService.findAll(query);

    return {
      data: this.formatToRdo(data),
      count,
    };
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get tale by slug' })
  @ApiParam({ name: 'slug', example: 'kamennyi-gorod' })
  @ApiOkResponse({ type: TaleRdo })
  @ApiNotFoundResponse({ description: 'Tale not found' })
  async findBySlug(@Param('slug') slug: string): Promise<TaleRdo> {
    return this.formatToRdo(await this.talesService.findBySlug(slug));
  }


  @Get(':id')
  @ApiOperation({ summary: 'Get tale by id' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ type: TaleRdo })
  @ApiNotFoundResponse({ description: 'Tale not found' })
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<TaleRdo> {
    return this.formatToRdo(await this.talesService.findOne(id));
  }

  @Patch(':id')
  @ApiKeyGuard()
  @ApiOperation({
    summary: 'Update tale by id (name / taleImageId / detach image with null)',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ type: TaleRdo })
  @ApiNotFoundResponse({ description: 'Tale not found' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateTaleDto,
  ): Promise<TaleRdo> {
    return this.formatToRdo(await this.talesService.update(id, dto));
  }

  @Delete(':id')
  @ApiKeyGuard()
  @ApiOperation({ summary: 'Delete tale by id' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        deleted: { type: 'boolean', example: true },
        id: { type: 'string', format: 'uuid' },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Tale not found' })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.talesService.remove(id);
  }
}
