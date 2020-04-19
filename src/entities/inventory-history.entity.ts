import { Entity, Unique, Index, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';
import { BaseEntity } from './base.entity';

@Entity('inventory_history')
export class InventoryHistory extends BaseEntity {
    @OneToOne((type) => Product, { eager: true, onDelete: "CASCADE" })
    @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
    product: Product;

    @Column('int', { name: 'initial_quantity', nullable: false })
    initialQuatity: number;

    @Column('decimal', { default: 0.0, name: 'initial_price' })
    initialPrice: number;

    @Column('int', { name: 'current_quantity', nullable: false })
    currentQuantity: number;

    @Column('decimal', { default: 0.0, name: 'current_price' })
    currentPrice: number;
}