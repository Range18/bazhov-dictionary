import { IsNotEmpty, IsString } from 'class-validator';

export class TaleQueryDto {
  @IsString()
  @IsNotEmpty()
  search: string;
}
