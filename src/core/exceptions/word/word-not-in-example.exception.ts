import {
  HttpException,
  HttpExceptionOptions,
  HttpStatus,
} from '@nestjs/common';

export class WordNotInExampleException extends HttpException {
  constructor(options?: HttpExceptionOptions) {
    super('Слово не найдено в примере', HttpStatus.NOT_FOUND, options);
  }
}
