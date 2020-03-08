import { BaseEntity, Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('encrypted_code')
export class EncryptedCode extends BaseEntity {
    @Column({ type: 'varchar', nullable: true, default: null })
    code: string;

    @Column({ type: 'varchar', nullable: true, default: null })
    salt: string;

    @Column({ type: 'int', nullable: true, default: null })
    purpose: EncryptionPurpose;

    @Column({ type: 'datetime', nullable: true, default: null })
    expiry: Date;

    @OneToOne(type => User, user => user.encryptedCode)
    @JoinColumn() // specify inverse side as a second parameter
    user: User;
}

export enum EncryptionPurpose {
    CUSTOMER_ONBOARDING = 1,
    FORGOT_PASSWORD
}