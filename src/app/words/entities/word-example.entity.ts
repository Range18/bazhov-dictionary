import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Word } from './word.entity';
import { Tale } from '../../tales/entities/tale.entity';

@Entity('word_examples')
export class WordExample {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ type: 'text' })
  exampleText: string;

  @ManyToOne(() => Word, (word) => word.examples, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'wordId' })
  word: Word;

  @ManyToOne(() => Tale, (tale) => tale.wordExamples, {
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'taleId' })
  tale: Tale;
}
