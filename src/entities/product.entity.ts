import { Category } from './category.entity';
import {
	VersionColumn,
	UpdateDateColumn,
	CreateDateColumn,
	ManyToOne,
	Column,
	PrimaryGeneratedColumn,
	Entity,
	Index,
	OneToOne,
	JoinColumn
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Inventory } from './inventory.entity';
import { InventoryHistory } from './inventory-history.entity';

@Entity('products')
export class Product extends BaseEntity {
	@Index({ unique: true })
	@Column({ type: 'varchar', nullable: false })
	name: string;

	@Column({ type: 'text', nullable: true })
	description: string;

	@Column({ type: 'decimal', default: 0.0 })
	price: number;

	@Column({ name: 'image_url', type: 'varchar', nullable: true })
	imageName: string;

	@ManyToOne((type) => Category, (category) => category.products)
	category: Category;
}
