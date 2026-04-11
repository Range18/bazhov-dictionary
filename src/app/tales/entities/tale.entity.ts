import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {WordExample} from '../../words/entities/word-example.entity';
import {TaleImage} from "../../tale-images/entities/tale-image.entity";

@Entity('tales')
export class Tale {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column({nullable: false, unique: true})
    slug: string;

    @OneToMany(() => WordExample, (ex) => ex.tale)
    wordExamples: WordExample[];

    @OneToOne(() => TaleImage, {nullable: true, onDelete: "SET NULL", eager: true})
    @JoinColumn()
    taleImage: TaleImage;
}
