// word-query.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class WordQueryDto {
  @ApiPropertyOptional({ example: 'малахит' })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ example: 'М' })
  @IsString()
  @IsOptional()
  byLetter?: string;

  @ApiPropertyOptional({ example: 'malahitovay-shkatulka', description: 'Filter by tale slug' })
  @IsString()
  @IsOptional()
  tale?: string;

  @ApiPropertyOptional({ example: 1, description: 'Page number (starts from 1)' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ example: 20, description: 'Items per page' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number;
}
