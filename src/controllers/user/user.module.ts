import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { EncryptedCodeRepository } from './repository/encrypted-code.repository';
import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';

@Module({
    providers: [UserService],
    imports: [TypeOrmModule.forFeature([UserRepository, EncryptedCodeRepository])]
})
export class UserModule { }
