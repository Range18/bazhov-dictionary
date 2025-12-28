import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { plainToInstance, Transform } from 'class-transformer';
import { TaleRdo } from '../../tales/rdo/tale.rdo';

export class WordRdo {
  @ApiProperty({ example: '7d3f6d6a-6d7f-4c1a-9e84-1cc0f7f20c2a' })
  id: string;

  @ApiProperty({ example: 'Малахит' })
  word: string;

  @ApiPropertyOptional({ example: 'Малахи́т' })
  wordWithAccent?: string;

  @ApiProperty({ example: 'Минерал зелёного цвета...' })
  description: string;

  @ApiProperty({ example: 'На Урале малахит добывали...' })
  exampleText: string;

  @ApiProperty({ type: () => TaleRdo, required: false })
  @Transform(({ value }) => (value ? plainToInstance(TaleRdo, value) : value))
  tale?: TaleRdo;
}
