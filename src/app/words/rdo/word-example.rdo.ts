import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance, Transform, Type } from 'class-transformer';
import { TaleRdo } from '../../tales/rdo/tale.rdo';

export class WordExampleRdo {
  @ApiProperty({ example: 'На Урале малахит добывали...' })
  exampleText: string;

  @ApiProperty({ type: () => TaleRdo })
  @Type(() => TaleRdo)
  @Transform(({ value }) => (value ? plainToInstance(TaleRdo, value) : value))
  tale: TaleRdo;
}
