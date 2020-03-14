import { UserType } from './../../../entities/user.entity';
import { LoginRequest } from './../../../models/request-dto/login-request.dto';
import { BaseResponse } from './../../../models/response-dto/base-response';
import { UserRepository } from './../repository/user.repository';
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository) private readonly _userRepository: UserRepository,
        private readonly _jwtService: JwtService
    ) { }

    async authenticateUser(request: LoginRequest): Promise<BaseResponse> {
        //fetch user by email
        let user = await this._userRepository.findOne({ where: { email: request.email, userType: request.role } });
        if (!user) {
            throw new UnauthorizedException('Invalid login credentials');
        }
        if (!user.isActive) {
            throw new UnauthorizedException('Your user account is not active');
        }
        //compare passwords
        const isEqual = await bcrypt.compare(request.password, user.password);
        if (!isEqual) {
            throw new UnauthorizedException('Invalid login credentials')
        }
        const payload = { sub: user.id, email: user.email };
        var token = this._jwtService.sign(payload);
        return {
            body: {
                token: token
            },
            message: null,
            status: true
        }
    }
}