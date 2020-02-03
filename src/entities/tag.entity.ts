import { Product } from './product.entity';
import { Entity, Index, Column, OneToMany } from 'typeorm';
import { BaseEntity } from "./base.entity";
import { TaggedProduct } from './tagged-product.entity';

@Entity('tags')
export class Tag extends BaseEntity {
    @Index({ unique: true })
    @Column({ type: 'varchar', nullable: false })
    name: string;

    @OneToMany((type) => Product, (product) => product.tag, { eager: true })
    products: Product[];
}
