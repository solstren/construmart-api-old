import { AuthUserDto } from './../../../models/request-dto/auth-user.dto';
import { UserRepository } from './../repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
dotenv.config({ debug: true });

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        // @InjectRepository(UserRepository) private readonly _userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_KEY
        });
    }

    async validate(payload: any): Promise<AuthUserDto> {
        return { userId: Number(payload.sub), email: payload.email, role: payload.role };
    }
}