import { Expose } from 'class-transformer';

export class TaleImageRdo {
    @Expose()
    id: string;

    @Expose()
    filename: string;
}
