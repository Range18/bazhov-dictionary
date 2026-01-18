import { BadRequestException, NestInterceptor, Type } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path, { extname } from 'path';
import { randomUUID } from 'crypto';
import { storageConfig } from '../configs';
import { fixOriginalName } from '../utils/fix-originalname';

type MulterInterceptor = Type<NestInterceptor<any, any>>;

function imageFileFilter(_req: any, file: Express.Multer.File, cb: any) {
  if (!file?.mimetype?.startsWith('image/')) {
    return cb(new BadRequestException('Only image files are allowed'), false);
  }
  cb(null, true);
}

export function ImageFileInterceptor(
  fieldName = 'file',
  folder = 'tale-images',
  maxSizeMb = 10,
): MulterInterceptor {
  return FileInterceptor(fieldName, {
    fileFilter: imageFileFilter,
    limits: { fileSize: maxSizeMb * 1024 * 1024 },
    storage: diskStorage({
      destination: path.join(storageConfig.path, folder),
      filename: (_req, file, cb) => {
        const original = fixOriginalName(file.originalname);
        const ext = extname(original) || '';
        cb(null, `${randomUUID()}${ext}`);
      },
    }),
  });
}
