import { IsOptional, IsString } from 'class-validator';

export class WordQueryDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  byLetter?: string;
}
