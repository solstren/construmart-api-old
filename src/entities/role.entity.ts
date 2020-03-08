import { User } from './user.entity';
import { Entity, BaseEntity, Column, Index, ManyToMany } from 'typeorm';
@Entity('customer')
export class Role extends BaseEntity {
    @Index({ unique: true })
    @Column({ type: 'varchar', nullable: false })
    name: string;

    @ManyToMany(type => User, user => user.roles)
    users: User[];
}