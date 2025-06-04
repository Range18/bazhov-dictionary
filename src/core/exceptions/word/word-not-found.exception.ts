import {
  HttpException,
  HttpExceptionOptions,
  HttpStatus,
} from '@nestjs/common';

export class WordNotFoundException extends HttpException {
  constructor(options?: HttpExceptionOptions) {
    super('Слово не найдено', HttpStatus.NOT_FOUND, options);
  }
}
