import { NotificationService } from './../../../core/notification.service';
import { AppConstants } from './../../../utils/app-constants';
import { ResendOtpRequest } from './../../../models/request-dto/resend-otp-request.dto';
import { stringLiteral } from '@babel/types';
import { ResponseMessages } from './../../../utils/response-messages';
import { EncryptedCodeRepository } from './../repository/encrypted-code.repository';
import { AppUtils } from './../../../utils/app-utils';
import { UserType, User } from './../../../entities/user.entity';
import { LoginRequest } from './../../../models/request-dto/login-request.dto';
import { BaseResponse } from './../../../models/response-dto/base-response';
import { UserRepository } from './../repository/user.repository';
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, UnauthorizedException, UnprocessableEntityException, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { EncryptedCode, EncryptionCodePurpose } from '../../../entities/encrypted-code.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository) private readonly _userRepository: UserRepository,
        @InjectRepository(EncryptedCodeRepository) private readonly _encryptedCodeRepo: EncryptedCodeRepository,
        private readonly _jwtService: JwtService,
        private readonly _notificationService: NotificationService
    ) { }

    async authenticateUser(request: LoginRequest): Promise<BaseResponse> {
        //fetch user by email
        let user: User = null;
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
            throw new UnauthorizedException('User account is not active');
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

    //Generates the encrypted code to be saved at caller
    async generateEncryptedCode(email: string, otp: string, purpose: EncryptionCodePurpose, role: UserType): Promise<EncryptedCode> {
        let user: User = null
        let encryptedCode: EncryptedCode = null;
        try {
            user = await this._userRepository.findOne({ where: { email: email, userType: role } });
        } catch (error) {
            Logger.error(error);
            throw new InternalServerErrorException(ResponseMessages.ERROR);
        }
        let expiry = new Date();
        expiry.setHours(expiry.getHours() + 2);
        if (user) {
            try {
                encryptedCode = await this._encryptedCodeRepo.findOne({ where: { user: user } });
            } catch (error) {
                Logger.error(error);
                throw new InternalServerErrorException(ResponseMessages.ERROR);
            }
            if (encryptedCode) {
                encryptedCode.code = await bcrypt.hash(otp, await bcrypt.genSalt());
                encryptedCode.expiry = expiry.toString();
                encryptedCode.purpose = purpose;
            }
            else {
                encryptedCode = new EncryptedCode();
                encryptedCode.code = await bcrypt.hash(otp, await bcrypt.genSalt());
                encryptedCode.expiry = expiry.toString();
                encryptedCode.purpose = purpose;
            }
        } else {
            encryptedCode = new EncryptedCode();
            encryptedCode.code = await bcrypt.hash(otp, await bcrypt.genSalt());
            encryptedCode.expiry = expiry.toString();
            encryptedCode.purpose = purpose;
        }

        return encryptedCode;
    }

    async VerifyOtp(savedEncryptedCode: EncryptedCode, otp: string): Promise<void> {
        if (savedEncryptedCode == null) {
            throw new UnprocessableEntityException("Invalid Otp");
        }
        const isEqual = await bcrypt.compare(otp, savedEncryptedCode.code);
        const expiryDate = new Date(savedEncryptedCode.expiry);
        const currentDate = new Date();
        if (savedEncryptedCode.isUsed) {
            throw new UnprocessableEntityException('invalid Otp');
        }
        if (!isEqual) {
            throw new UnprocessableEntityException('invalid Otp');
        }
        if (isEqual && (expiryDate.getTime() < currentDate.getTime())) {
            throw new UnprocessableEntityException('OTP has expired. Please click on resend to generate a new OTP');
        }
        if (isEqual && savedEncryptedCode.purpose !== EncryptionCodePurpose.CUSTOMER_ONBOARDING) {
            throw new UnprocessableEntityException('invalid OTP');
        }
    }

    async ResendOtp(request: ResendOtpRequest): Promise<BaseResponse> {
        let user: User = null;
        try {
            user = await this._userRepository.findOne({ where: { email: request.email, userType: request.role } });
        } catch (error) {
            Logger.error(error);
            throw new InternalServerErrorException(ResponseMessages.ERROR);
        }
        if (!user) {
            throw new UnprocessableEntityException('User account with this email does not exist');
        }
        let otp = AppUtils.GenerateOtp();
        var encryptedCode = await this.generateEncryptedCode(request.email, otp, request.purpose, request.role);
        this._encryptedCodeRepo.save(encryptedCode);
        //send activation link to email
        let from = AppConstants.DOCUMENT_NAME;
        let to = user.email;
        let FromName = "Construmart";
        let subject = null;
        let htmlbody = `<h4>Your one time password  is <b>${otp}</b>`;
        switch (request.purpose) {
            case EncryptionCodePurpose.CUSTOMER_ONBOARDING:
                subject = 'Account Registration';
                break;
            case EncryptionCodePurpose.PASSWORD_RESET:
                subject = 'Password Reset'
            default:
                subject = 'Your One Time Password'
                break;
        }
        await this._notificationService.sendEmailUsingSendgrid(from, to, FromName, subject, null, htmlbody);
        return {
            status: true,
            message: 'Please complete your registration using the one time password sent to your email',
            body: null
        };
    }
}