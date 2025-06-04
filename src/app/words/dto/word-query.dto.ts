import { IsNotEmpty, IsString } from 'class-validator';

export class WordQueryDto {
  @IsString()
  @IsNotEmpty()
  search: string;
}
