import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tale } from '../../tales/entities/tale.entity';

@Entity('words')
export class Word {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  word: string;

  @Column({ nullable: true })
  wordWithAccent?: string;

  @Column()
  description: string;

  @Column()
  exampleText: string;

  @ManyToOne(() => Tale, (tale) => tale.words, {
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  tale: Tale;
}
