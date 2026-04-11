import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class WordExampleInputDto {
  @ApiProperty({ example: '7d3f6d6a-6d7f-4c1a-9e84-1cc0f7f20c2a', description: 'Tale id' })
  @IsUUID()
  taleId: string;

  @ApiProperty({ example: 'На Урале малахит добывали...' })
  @IsString()
  exampleText: string;
}
