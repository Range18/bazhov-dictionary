import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

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
}
