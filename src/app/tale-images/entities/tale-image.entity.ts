import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tale_images')
export class TaleImage {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  filename: string;

  @Column()
  originalName: string;
}
