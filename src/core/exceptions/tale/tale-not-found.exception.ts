import {
  HttpException,
  HttpExceptionOptions,
  HttpStatus,
} from '@nestjs/common';

export class TaleNotFoundException extends HttpException {
  constructor(options?: HttpExceptionOptions) {
    super('Сказ не найден', HttpStatus.NOT_FOUND, options);
  }
}
