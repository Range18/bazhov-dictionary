import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { WordExampleInputDto } from './word-example-input.dto';

export class UpdateWordDto {
    @ApiPropertyOptional({ example: 'Малахит' })
    @IsOptional()
    @IsString()
    word?: string;

    @ApiPropertyOptional({ example: 'Малахи́т' })
    @IsOptional()
    @IsString()
    wordWithAccent?: string;

    @ApiPropertyOptional({ example: 'Описание...' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({
        type: [WordExampleInputDto],
        description: 'Если передано — полностью заменяет список примеров',
    })
    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => WordExampleInputDto)
    examples?: WordExampleInputDto[];
}
