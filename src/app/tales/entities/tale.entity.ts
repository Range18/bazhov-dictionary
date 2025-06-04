import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Word } from '../../words/entities/word.entity';

@Entity('tales')
export class Tale {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  name: string;

  @OneToMany(() => Word, (word) => word.tale)
  words: Word[];
}
