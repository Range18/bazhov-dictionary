import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { createReadStream, existsSync } from 'fs';
import * as path from 'path';

import { TaleImagesService } from './tale-images.service';
import { BaseEntityService } from '../../core/base/base-entity.service';
import { TaleImageRdo } from './rdo/tale-image.rdo';
import { ImageFileInterceptor } from '../../core/interceptors/image-upload.interceptor';
import { taleImagesStorageConfig } from '../../core/configs';
import { resolveMimeType } from '../../core/utils/resolve-mimetype';
import { TaleImageNotFoundException } from '../../core/exceptions';
import { TaleImageUploadBody } from './swagger/tale-image-upload.swagger';
import { ApiKeyGuard } from '../../core/decorator/api-key-guard.decorator';

@ApiTags('Tale Images')
@Controller('tale-images')
export class TaleImagesController extends BaseEntityService<TaleImageRdo> {
  constructor(private readonly taleImagesService: TaleImagesService) {
    super(TaleImageRdo);
  }

  @Post()
  @ApiKeyGuard()
  @ApiOperation({ summary: 'Upload a new tale image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: TaleImageUploadBody })
  @ApiOkResponse({ type: TaleImageRdo })
  @ApiBadRequestResponse({
    description: 'file is required / Only image files are allowed',
  })
  @UseInterceptors(ImageFileInterceptor('file', 'tale-images', 50))
  async create(@UploadedFile() file?: Express.Multer.File) {
    if (!file) throw new BadRequestException('file is required');

    const entity = await this.taleImagesService.create(file);
    return this.formatToRdo(entity);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tale images' })
  @ApiOkResponse({ type: TaleImageRdo, isArray: true })
  async findAll() {
    const entities = await this.taleImagesService.findAll();
    return this.formatToRdo(entities);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get tale image by id (metadata)' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ type: TaleImageRdo })
  @ApiNotFoundResponse({ description: 'TaleImage not found' })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const entity = await this.taleImagesService.findOne(id);
    return this.formatToRdo(entity);
  }

  @Get(':id/source')
  @ApiOperation({ summary: 'Get image file by id (binary)' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiProduces('image/*')
  @ApiOkResponse({
    description: 'Binary image stream',
    schema: { type: 'string', format: 'binary' },
  })
  @ApiNotFoundResponse({ description: 'TaleImage not found / File not found' })
  async getOneSource(@Param('id', new ParseUUIDPipe()) id: string) {
    const entity = await this.taleImagesService.findOne(id);

    const filePath = path.resolve(
      taleImagesStorageConfig.path,
      entity.filename,
    );
    if (!existsSync(filePath)) throw new TaleImageNotFoundException();

    return new StreamableFile(createReadStream(filePath), {
      type: resolveMimeType(entity.filename),
    });
  }

  @Patch(':id')
  @ApiKeyGuard()
  @ApiOperation({ summary: 'Replace image file by id' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: TaleImageUploadBody })
  @ApiOkResponse({ type: TaleImageRdo })
  @ApiBadRequestResponse({
    description: 'file is required / Only image files are allowed',
  })
  @ApiNotFoundResponse({ description: 'TaleImage not found' })
  @UseInterceptors(ImageFileInterceptor('file', 'tale-images', 50))
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('file is required');

    const entity = await this.taleImagesService.update(id, file.filename);
    return this.formatToRdo(entity);
  }

  @Delete(':id')
  @ApiKeyGuard()
  @ApiOperation({ summary: 'Delete tale image record by id' })
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
  @ApiNotFoundResponse({ description: 'TaleImage not found' })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.taleImagesService.remove(id);
  }
}
