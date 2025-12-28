import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTaleDto {
    @ApiProperty({ example: 'Каменный цветок' })
    @IsString()
    name: string;

    @ApiPropertyOptional({ example: '7d3f6d6a-6d7f-4c1a-9e84-1cc0f7f20c2a', description: 'TaleImage id' })
    @IsOptional()
    @IsUUID()
    taleImageId?: string;
}
