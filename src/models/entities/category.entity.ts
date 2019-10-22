import { Entity, Column, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, Timestamp, UpdateDateColumn, VersionColumn } from 'typeorm';
import { Product } from './product.entity';
import { BaseEntity } from './base.entity';

@Entity('categories')
export class Category extends BaseEntity{
    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ name: 'image_url', type: 'varchar', nullable: true })
    imageUrl: string;

    @OneToMany(type => Product, product => product.category)
    products: Product[];
}
