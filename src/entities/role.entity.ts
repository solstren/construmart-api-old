import { User } from './user.entity';
import { Entity, Column, Index, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
@Entity('customer')
export class Role extends BaseEntity {
    @Index({ unique: true })
    @Column({ type: 'varchar', nullable: false })
    name: string;

    @ManyToMany(type => User, user => user.roles)
    users: User[];
}