import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

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

    @ApiPropertyOptional({ example: 'Пример...' })
    @IsOptional()
    @IsString()
    exampleText?: string;

    @ApiPropertyOptional({ example: '7d3f6d6a-6d7f-4c1a-9e84-1cc0f7f20c2a' })
    @IsOptional()
    @IsUUID()
    taleId?: string | null;
}
