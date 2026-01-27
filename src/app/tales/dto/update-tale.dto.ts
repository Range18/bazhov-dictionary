import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateTaleDto {
    @ApiPropertyOptional({ example: 'Каменный цветок' })
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    slug?: string;

    @ApiPropertyOptional({
        example: '7d3f6d6a-6d7f-4c1a-9e84-1cc0f7f20c2a',
        nullable: true,
    })
    @IsOptional()
    @IsUUID()
    taleImageId?: string | null;
}
