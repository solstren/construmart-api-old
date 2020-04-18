import { UserService } from './../../user/services/user.service';
import { ResponseMessages } from './../../../utils/response-messages';
import { VerifyCustomerRequest } from '../../../models/request-dto/verify-customer.dto';
import { AppUtils } from './../../../utils/app-utils';
import { AppConstants } from './../../../utils/app-constants';
import { NotificationService } from './../../../core/notification.service';
import { Customer } from './../../../entities/customer.entity';
import { UserRepository } from './../../user/repository/user.repository';
import { CreateCustomerRequest } from '../../../models/request-dto/create-customer-request.dto';
import { BaseResponse } from './../../../models/response-dto/base-response';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnprocessableEntityException, InternalServerErrorException, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { CustomerRepository } from '../repositories/customer-repository';
import { User, UserType } from '../../../entities/user.entity';
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';
import { EncryptedCode, EncryptionPurpose } from '../../../entities/encrypted-code.entity';
import { EncryptedCodeRepository } from '../../../controllers/user/repository/encrypted-code.repository';
import { getManager } from 'typeorm'

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(CustomerRepository) private readonly _customerRepository: CustomerRepository,
        @InjectRepository(UserRepository) private readonly _userRepository: UserRepository,
        @InjectRepository(EncryptedCodeRepository) private readonly _encryptedCodeRepo: EncryptedCodeRepository,
        private readonly _notificationService: NotificationService,
        private readonly _userService: UserService
    ) { }

    async createCustomer(request: CreateCustomerRequest): Promise<BaseResponse> {
        let isExist = await this._userRepository.hasUser(request.email);
        let user = await this._userRepository.findOne({ where: { email: request.email } });
        if (!user || !user.isActive) {
            throw new UnprocessableEntityException("Email has been taken");
        }
        // Generate otp and assign it to user
        let otp = AppUtils.GenerateOtp()
        const encryptedCode = await this._userService.generateOtp(request.email, otp, EncryptionPurpose.CUSTOMER_ONBOARDING);
        // this._encryptedCodeRepo.save(encryptedCode);

        user = new User();
        user.email = request.email;
        user.isEmailConfirmed = false;
        user.isPhoneNumberConfirmed = false;
        user.isActive = false;
        user.phoneNumber = request.phoneNumber;
        user.password = await bcrypt.hash(request.password, await bcrypt.genSalt());
        user.encryptedCode = encryptedCode;
        user.userType = UserType.CUSTOMER;
        // this._userRepository.save(user);

        const customer = new Customer();
        customer.firstname = request.firstname;
        customer.lastname = request.lastname;
        customer.user = user;

        try {
            await getManager().transaction(async transactionalEntityManager => {
                await transactionalEntityManager.save(encryptedCode);
                await transactionalEntityManager.save(user);
                await transactionalEntityManager.save(customer);
                // ...
            });
        } catch (error) {
            console.log(`Error while creating customer: ${error}`);
        }

        //send activation link to email
        let from = AppConstants.DOCUMENT_NAME;
        let to = user.email;
        let FromName = "Construmart";
        let subject = "Your Account Registration";
        let htmlbody = `<h4>Please use the one time password <b>${otp}</b> to activate your account</h4>`;
        await this._notificationService.sendEmailUsingNodeMailer(from, to, FromName, subject, null, htmlbody);
        return {
            status: true,
            message: 'Please complete your registration using the one time password sent to your email',
            body: null
        };
    }

    async verifyCustomer(request: VerifyCustomerRequest): Promise<BaseResponse> {
        //fetch user by email
        let user = await this._userRepository.findOne({ where: { email: request.email } });
        if (user == null) {
            throw new UnprocessableEntityException("Invalid user account");
        }
        //fetch saved encrypted otp
        let savedEncryptedCode = await this._encryptedCodeRepo.findOne({ where: { user: user } });
        await this._userService.VerifyOtp(savedEncryptedCode, request.otp);
        user.isActive = true;
        user.isEmailConfirmed = true;

        try {
            await getManager().transaction(async transactionalEntityManager => {
                await transactionalEntityManager.save(savedEncryptedCode);
                await transactionalEntityManager.save(user);
                // ...
            });
        } catch (error) {
            console.log(`Error while verifying customer otp: ${error}`);
            throw new HttpException(ResponseMessages.ERROR, HttpStatus.NOT_MODIFIED);
        }

        //return response
        return {
            body: null,
            message: null,
            status: true
        }
    }
}
