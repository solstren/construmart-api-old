import { Category } from './category.entity';
import { VersionColumn, UpdateDateColumn, CreateDateColumn, ManyToOne, Column, PrimaryGeneratedColumn, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('products')
export class Product extends BaseEntity {
    @Index({unique: true})
    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'money', default: 0.00 })
    price: number;

    @Column({ name: 'image_url', type: 'varchar', nullable: true })
    imageName: string;

    @ManyToOne(type => Category, category => category.products)
    category: Category;
}