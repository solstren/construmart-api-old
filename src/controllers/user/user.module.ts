import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { EncryptedCodeRepository } from './repository/encrypted-code.repository';
import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';
import * as dotenv from 'dotenv';
dotenv.config({ debug: true });

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [
        JwtModule.register({
            secret: process.env.JWT_KEY,
            signOptions: {
                algorithm: "HS512",
                audience: process.env.JWT_AUDIENCE,
                expiresIn: 3600,
                issuer: process.env.JWT_ISSUER
            }
        }),
        TypeOrmModule.forFeature([UserRepository, EncryptedCodeRepository])
    ],
    exports: [UserService]
})
export class UserModule { }
