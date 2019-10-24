import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn({type: 'bigint', unsigned: true})
    id: number;

    @CreateDateColumn({name: 'date_created', type: 'timestamp'})
    dateCreated: Date;

    @UpdateDateColumn({name: 'date_updated', type: 'timestamp'})
    dateUpdated: Date;

    @VersionColumn({name: 'row_version', type: 'int', unsigned: true})
    rowVersion: number;
}