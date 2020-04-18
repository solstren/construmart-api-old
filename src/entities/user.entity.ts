import { Customer } from './customer.entity';
import { Entity, Index, Column, OneToOne, ManyToMany, JoinTable, Code } from "typeorm";
import { BaseEntity } from "./base.entity";
import { EncryptedCode } from './encrypted-code.entity';

@Entity('user')
export class User extends BaseEntity {
    @Index({ unique: true })
    @Column({ type: 'varchar', nullable: false })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ name: "is_active", type: 'boolean', nullable: false, default: false })
    isActive: boolean;

    @Column({ name: "phone_number", type: 'varchar' })
    phoneNumber: string;

    @Column({ name: "is_email_confirmed", type: 'boolean', nullable: false, default: false })
    isEmailConfirmed: boolean;

    @Column({ name: "is_phone_number_confirmed", type: 'boolean', nullable: false, default: false })
    isPhoneNumberConfirmed: boolean;

    @Column({ name: "user_type", type: 'int', nullable: false })
    userType: UserType;

    @OneToOne(type => Customer, customer => customer.user) // specify inverse side as a second parameter
    customer: Customer;

    @OneToOne(type => EncryptedCode, code => code.user) // specify inverse side as a second parameter
    encryptedCode: EncryptedCode;
}

export enum UserType {
    ADMIN = 1,
    CUSTOMER
}