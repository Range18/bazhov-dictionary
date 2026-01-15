import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TaleImageRdo {
    private static apiUrl = '';

    static init(apiUrl: string) {
        TaleImageRdo.apiUrl = apiUrl.replace(/\/+$/, '');
    }

    @ApiProperty({ example: '7d3f6d6a-6d7f-4c1a-9e84-1cc0f7f20c2a' })
    @Expose()
    id: string;

    @ApiProperty({ example: 'a1b2c3d4e5f6g7h8.png', description: 'Stored filename in storage' })
    @Expose()
    filename: string;

    @ApiProperty({ example: 'originalName.png', description: 'Stored originalName in storage' })
    @Expose()
    originalName: string;

    @ApiProperty({ description: 'Link to get image source' })
    @Expose()
    get link(): string {
        return `${TaleImageRdo.apiUrl}/api/tale-images/${this.id}/source`;
    }
}
