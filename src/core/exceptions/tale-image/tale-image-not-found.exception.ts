import {
  HttpException,
  HttpExceptionOptions,
  HttpStatus,
} from '@nestjs/common';

export class TaleImageNotFoundException extends HttpException {
  constructor(options?: HttpExceptionOptions) {
    super('Изображение сказа не найдено', HttpStatus.NOT_FOUND, options);
  }
}
