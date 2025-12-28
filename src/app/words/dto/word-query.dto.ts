import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class WordQueryDto {
  @ApiPropertyOptional({ example: 'малахит', description: 'Search substring' })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ example: 'М', description: 'Filter by first letter' })
  @IsString()
  @IsOptional()
  byLetter?: string;
}
