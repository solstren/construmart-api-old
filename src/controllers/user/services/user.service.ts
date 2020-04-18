import { ResponseMessages } from './../../../utils/response-messages';
import { EncryptedCodeRepository } from './../repository/encrypted-code.repository';
import { AppUtils } from './../../../utils/app-utils';
import { UserType, User } from './../../../entities/user.entity';
import { LoginRequest } from './../../../models/request-dto/login-request.dto';
import { BaseResponse } from './../../../models/response-dto/base-response';
import { UserRepository } from './../repository/user.repository';
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, UnauthorizedException, UnprocessableEntityException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { EncryptedCode, EncryptionPurpose } from '../../../entities/encrypted-code.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository) private readonly _userRepository: UserRepository,
        @InjectRepository(EncryptedCodeRepository) private readonly _encryptedCodeRepo: EncryptedCodeRepository,
        private readonly _jwtService: JwtService
    ) { }

    async authenticateUser(request: LoginRequest): Promise<BaseResponse> {
        //fetch user by email
        let user = null;
        try {
            user = await this._userRepository.findOne({ where: { email: request.email, userType: request.role } });
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(ResponseMessages.ERROR);
        }
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
        var token = null;
        try {
            token = this._jwtService.sign(payload);
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
        return {
            body: {
                token: token
            },
            message: null,
            status: true
        }
    }

    async generateOtp(email: string, otp: string, purpose: EncryptionPurpose): Promise<EncryptedCode> {
        let expiry = new Date();
        expiry.setHours(expiry.getHours() + 2);
        const encryptedCode = new EncryptedCode();
        encryptedCode.code = await bcrypt.hash(otp, await bcrypt.genSalt());
        encryptedCode.expiry = expiry.toString();
        encryptedCode.purpose = EncryptionPurpose.CUSTOMER_ONBOARDING;
        return encryptedCode;
    }

    async VerifyOtp(savedEncryptedCode: EncryptedCode, otp: string): Promise<void> {

        if (savedEncryptedCode == null) {
            throw new UnprocessableEntityException("Invalid user account");
        }
        const isEqual = await bcrypt.compare(otp, savedEncryptedCode.code);
        var expiryDate = new Date(savedEncryptedCode.expiry);
        var currentDate = new Date();
        if (savedEncryptedCode.isUsed) {
            throw new UnprocessableEntityException('invalid Otp');
        }
        if (!isEqual) {
            throw new UnprocessableEntityException('invalid Otp');
        }
        if (isEqual && (expiryDate.getTime() < currentDate.getTime())) {
            throw new UnprocessableEntityException('OTP has expired. Please click on resend to generate a new OTP');
        }
        if (isEqual && savedEncryptedCode.purpose !== EncryptionPurpose.CUSTOMER_ONBOARDING) {
            throw new UnprocessableEntityException('invalid OTP');
        }
    }
}