import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class WordQueryDto {
  @ApiPropertyOptional({ example: 'малахит' })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ example: 'М' })
  @IsString()
  @IsOptional()
  byLetter?: string;

  @ApiPropertyOptional({ example: '7d3f6d6a-6d7f-4c1a-9e84-1cc0f7f20c2a', description: 'Filter by tale id' })
  @IsUUID()
  @IsOptional()
  taleId?: string;
}
