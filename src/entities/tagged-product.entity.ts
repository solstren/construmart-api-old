import { BaseEntity } from "./base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { type } from "os";
import { Product } from "./product.entity";
import { Tag } from "./tag.entity";

@Entity('tagged_products')
export class TaggedProduct extends BaseEntity {
    @Column({ nullable: false, name: 'product_id' })
    @OneToMany(type => Product, product => product.taggedProduct)
    productId: number;

    @Column({ nullable: false, name: 'tag_id' })
    @OneToMany(type => Tag, tag => tag.taggedProduct)
    tagId: number;
}
