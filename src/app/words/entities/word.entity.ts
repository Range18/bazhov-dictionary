import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WordExample } from './word-example.entity';

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

  @OneToMany(() => WordExample, (ex) => ex.word, {
    cascade: true,
  })
  examples: WordExample[];
}
