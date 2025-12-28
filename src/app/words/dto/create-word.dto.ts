import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

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

    @ApiProperty({ example: 'На Урале малахит добывали...' })
    @IsString()
    exampleText: string;

    @ApiPropertyOptional({ example: '7d3f6d6a-6d7f-4c1a-9e84-1cc0f7f20c2a', description: 'Tale id' })
    @IsOptional()
    @IsUUID()
    taleId?: string;
}
