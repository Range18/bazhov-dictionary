import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { plainToInstance, Transform, Type } from 'class-transformer';
import { WordExampleRdo } from './word-example.rdo';

export class WordRdo {
  @ApiProperty({ example: '7d3f6d6a-6d7f-4c1a-9e84-1cc0f7f20c2a' })
  id: string;

  @ApiProperty({ example: 'Малахит' })
  word: string;

  @ApiPropertyOptional({ example: 'Малахи́т' })
  wordWithAccent?: string;

  @ApiProperty({ example: 'Минерал зелёного цвета...' })
  description: string;

  @ApiProperty({
    type: [WordExampleRdo],
    description: 'Примеры употребления из разных сказов',
  })
  @Type(() => WordExampleRdo)
  @Transform(({ value }) =>
    Array.isArray(value)
      ? value.map((v) => plainToInstance(WordExampleRdo, v))
      : value,
  )
  examples: WordExampleRdo[];
}
