import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Word} from '../../words/entities/word.entity';
import {TaleImage} from "../../tale-images/entities/tale-image.entity";

@Entity('tales')
export class Tale {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column({nullable: true})
    slug?: string;

    @OneToMany(() => Word, (word) => word.tale)
    words: Word[];

    @OneToOne(() => TaleImage, {nullable: true, onDelete: "SET NULL", eager: true})
    @JoinColumn()
    taleImage: TaleImage;
}
