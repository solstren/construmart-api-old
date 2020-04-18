import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity('encrypted_code')
export class EncryptedCode extends BaseEntity {
    @Column({ type: 'varchar', nullable: true, default: null })
    code: string;

    @Column({ type: 'int', nullable: true, default: null })
    purpose: EncryptionPurpose;

    @Column({ type: 'varchar', nullable: false })
    expiry: string;

    @Column({ name: "is_used", type: 'boolean', nullable: false, default: false })
    isUsed: Boolean;

    @OneToOne(type => User, user => user.encryptedCode)
    @JoinColumn({ name: "user_id", referencedColumnName: 'id' }) // specify inverse side as a second parameter
    user: User;
}

export enum EncryptionPurpose {
    CUSTOMER_ONBOARDING = 1,
    FORGOT_PASSWORD
}