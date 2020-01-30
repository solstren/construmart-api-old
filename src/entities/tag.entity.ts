import { Entity, Index, Column, OneToMany } from 'typeorm';
import { BaseEntity } from "./base.entity";
import { TaggedProduct } from './tagged-product.entity';

@Entity('tags')
export class Tag extends BaseEntity {
    @Index({ unique: true })
    @Column({ type: 'varchar', nullable: false })
    name: string;

    @OneToMany(type => TaggedProduct, taggedProduct => taggedProduct.tagId)
    taggedProduct: TaggedProduct[];
}
