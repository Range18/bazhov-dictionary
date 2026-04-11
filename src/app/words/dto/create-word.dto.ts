import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { WordExampleInputDto } from './word-example-input.dto';

export class CreateWordDto {
    @ApiProperty({ example: 'Малахит' })
    @IsString()
    word: string;

    @ApiPropertyOptional({ example: 'Малахи́т' })
    @IsOptional()
    @IsString()
    wordWithAccent?: string;

    @ApiProperty({ example: 'Минерал зелёного цвета...' })
    @IsString()
    description: string;

    @ApiProperty({
        type: [WordExampleInputDto],
        description: 'Один или несколько примеров из разных сказов',
    })
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => WordExampleInputDto)
    examples: WordExampleInputDto[];
}
