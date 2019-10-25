import { Entity, Column, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, Timestamp, UpdateDateColumn, VersionColumn, Index, Unique } from 'typeorm';
import { Product } from './product.entity';
import { BaseEntity } from './base.entity';

@Entity('categories')
@Unique(['name'])
export class Category extends BaseEntity{
    @Index()
    @Column({ type: 'varchar'})
    name: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ name: 'image_url', type: 'varchar', nullable: true })
    imageUrl?: string;

    @OneToMany(type => Product, product => product.category)
    products: Product[];
}
