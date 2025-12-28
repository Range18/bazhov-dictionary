import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class TaleQueryDto {
  @ApiPropertyOptional({ example: 'каменный', description: 'Search by name' })
  @IsString()
  @IsOptional()
  search?: string;
}
