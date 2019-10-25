import { Category } from './category.entity';
import { VersionColumn, UpdateDateColumn, CreateDateColumn, ManyToOne, Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('products')
export class Product extends BaseEntity {
    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'money' })
    price: number;

    @Column({ name: 'image_url', type: 'varchar', nullable: true })
    imageUrl: string;

    @ManyToOne(type => Category, category => category.products)
    category: Category;
}