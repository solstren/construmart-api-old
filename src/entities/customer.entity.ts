import { User } from './user.entity';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from "./base.entity";

@Entity('customer')
export class Customer extends BaseEntity {
    @Column({ type: 'varchar', nullable: false })
    firstname: string;

    @Column({ type: 'varchar', nullable: false })
    lastname: string;

    @OneToOne(type => User, user => user.customer, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id", referencedColumnName: 'id' }) // specify inverse side as a second parameter
    user: User;
}