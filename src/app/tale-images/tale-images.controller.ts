import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post, Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TaleImagesService } from './tale-images.service';
import { BaseEntityService } from '../../core/base/base-entity.service';
import { TaleImageRdo } from './rdo/tale-image.rdo';
import {ImageFileInterceptor} from "../../core/interceptors/image-upload.interceptor";
import path from 'path';
import {taleImagesStorageConfig} from "../../core/configs";
import {createReadStream, existsSync} from "fs";
import {resolveMimeType} from "../../core/utils/resolve-mimetype";
import {Response} from "express";
import {TaleImageNotFoundException} from "../../core/exceptions";

@Controller('tale-images')
export class TaleImagesController extends BaseEntityService<TaleImageRdo> {
  constructor(private readonly taleImagesService: TaleImagesService) {
    super(TaleImageRdo);
  }

  @Post()
  @UseInterceptors(ImageFileInterceptor('file', 'tale-images', 50))
  async create(@UploadedFile() file?: Express.Multer.File) {
    if (!file) throw new BadRequestException('file is required');

    const entity = await this.taleImagesService.create(file.filename);
    return this.formatToRdo(entity);
  }

  @Get()
  async findAll() {
    const entities = await this.taleImagesService.findAll();
    return this.formatToRdo(entities);
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const entity = await this.taleImagesService.findOne(id);
    return this.formatToRdo(entity);
  }

  @Get(':id/source')
  async getOneSource(
      @Param('id', new ParseUUIDPipe()) id: string,
      @Res() res: Response,
  ) {
    const entity = await this.taleImagesService.findOne(id);

    // Абсолютный путь: <project>/STORAGE_PATH/tale-images/<filename>
    const filePath = path.resolve(taleImagesStorageConfig.path, entity.filename);

    if (!existsSync(filePath)) throw new TaleImageNotFoundException();

    res.setHeader('Content-Type', resolveMimeType(entity.filename));

    const stream = createReadStream(filePath);
    return stream.pipe(res);
  }

  @Patch(':id')
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
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.taleImagesService.remove(id);
  }
}
