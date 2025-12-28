import { ApiProperty } from '@nestjs/swagger';

export class TaleImageUploadBody {
    @ApiProperty({
        type: 'string',
        format: 'binary',
        description: 'Image file',
    })
    file: any;
}
