import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, plainToInstance, Transform } from 'class-transformer';
import { TaleImageRdo } from '../../tale-images/rdo/tale-image.rdo';

export class TaleRdo {
  @ApiProperty({ example: '7d3f6d6a-6d7f-4c1a-9e84-1cc0f7f20c2a' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'Каменный цветок' })
  @Expose()
  name: string;

  @ApiProperty({ example: 'malahitovay-shkatulka' })
  @Expose()
  slug: string;

  @ApiPropertyOptional({ type: () => TaleImageRdo })
  @Expose()
  @Transform(({ value }) => (value ? plainToInstance(TaleImageRdo, value) : value))
  taleImage?: TaleImageRdo | null;
}
