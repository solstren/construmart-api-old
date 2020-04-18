import { UserModule } from './../user/user.module';
import { CoreModule } from './../../core/core.module';
import { CustomerRepository } from './repositories/customer-repository';
import { EncryptedCodeRepository } from './../user/repository/encrypted-code.repository';
import { UserRepository } from './../user/repository/user.repository';
import { CustomerService } from './services/customer.service';
import { NotificationService } from './../../core/notification.service';
import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
    providers: [CustomerService],
    controllers: [CustomerController],
    imports: [CoreModule, UserModule, TypeOrmModule.forFeature([UserRepository, CustomerRepository, EncryptedCodeRepository])]
})
export class CustomerModule { }
