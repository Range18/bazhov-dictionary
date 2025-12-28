import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TaleImageRdo {
    @ApiProperty({ example: '7d3f6d6a-6d7f-4c1a-9e84-1cc0f7f20c2a' })
    @Expose()
    id: string;

    @ApiProperty({ example: 'a1b2c3d4e5f6g7h8.png', description: 'Stored filename in storage' })
    @Expose()
    filename: string;
}
