import { TaleRdo } from '../../tales/rdo/tale.rdo';
import { plainToInstance, Transform } from 'class-transformer';

export class WordRdo {
  id: string;

  word: string;

  wordWithAccent?: string;

  description: string;

  exampleText: string;

  @Transform(({ value }) => plainToInstance(value, TaleRdo))
  tale: TaleRdo;
}
