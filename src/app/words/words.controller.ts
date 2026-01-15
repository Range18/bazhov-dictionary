import {Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query} from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { WordsService } from './words.service';
import { WordQueryDto } from './dto/word-query.dto';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { WordRdo } from './rdo/word.rdo';
import { BaseEntityService } from '../../core/base/base-entity.service';
import {ApiKeyGuard} from "../../core/decorator/api-key-guard.decorator";

@ApiTags('Words')
@Controller('words')
export class WordsController extends BaseEntityService<WordRdo> {
  constructor(private readonly wordsService: WordsService) {
    super(WordRdo);
  }

  @Post()
  @ApiKeyGuard()
  @ApiOperation({ summary: 'Create word' })
  @ApiOkResponse({ type: WordRdo })
  @ApiBadRequestResponse({ description: 'Validation error' })
  async create(@Body() dto: CreateWordDto) {
    return this.formatToRdo(await this.wordsService.create(dto));
  }

  @Get()
  @ApiOperation({ summary: 'Get words list (with filters)' })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: { type: 'array', items: { $ref: '#/components/schemas/WordRdo' } },
        count: { type: 'number', example: 123 },
      },
    },
  })
  async findAll(@Query() query: WordQueryDto) {
    const { data, count } = await this.wordsService.findAll(query);
    return { data: this.formatToRdo(data), count };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get word by id' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ type: WordRdo })
  @ApiNotFoundResponse({ description: 'Word not found' })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.formatToRdo(await this.wordsService.findOne(id));
  }

  @Patch(':id')
  @ApiKeyGuard()
  @ApiOperation({ summary: 'Update word by id' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ type: WordRdo })
  @ApiNotFoundResponse({ description: 'Word not found' })
  async update(
      @Param('id', new ParseUUIDPipe()) id: string,
      @Body() dto: UpdateWordDto,
  ) {
    return this.formatToRdo(await this.wordsService.update(id, dto));
  }

  @Delete(':id')
  @ApiKeyGuard()
  @ApiOperation({ summary: 'Delete word by id' })
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
  @ApiNotFoundResponse({ description: 'Word not found' })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.wordsService.remove(id);
  }
}
