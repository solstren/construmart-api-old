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
import { Injectable, UnprocessableEntityException, InternalServerErrorException, HttpException, HttpStatus, NotFoundException, Logger } from '@nestjs/common';
import { CustomerRepository } from '../repositories/customer-repository';
import { User, UserType } from '../../../entities/user.entity';
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';
import { EncryptedCode, EncryptionCodePurpose } from '../../../entities/encrypted-code.entity';
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
        let user: User = null;
        try {
            user = await this._userRepository.findOne({ where: { email: request.email, userType: UserType.CUSTOMER } });
        } catch (error) {
            Logger.error(`ERROR_CustomerService.verifyCustomer: Error fetching user ${error}`);
            throw new InternalServerErrorException(ResponseMessages.ERROR);
        }

        if (user && user.isActive) {
            throw new UnprocessableEntityException("Email has been taken");
        }
        if (user && !user.isActive) {
            return this._userService.resendOtp({
                email: user.email,
                role: UserType.CUSTOMER,
                purpose: EncryptionCodePurpose.CUSTOMER_ONBOARDING
            });
        }
        // Generate otp and assign it to user
        let otp = AppUtils.GenerateOtp();
        const encryptedCode = await this._userService.generateEncryptedCode(request.email, otp, EncryptionCodePurpose.CUSTOMER_ONBOARDING, UserType.CUSTOMER);
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
            Logger.error(`Error while creating customer: ${error.detail || error.message}`);
            throw new InternalServerErrorException(ResponseMessages.ERROR);
        }

        //send activation link to email
        let from = AppConstants.DOCUMENT_NAME;
        let to = user.email;
        let FromName = "Construmart";
        let subject = "Account Registration";
        let htmlbody = `<h4>Your one time password  is <b>${otp}</b>`;
        await this._notificationService.sendEmailUsingNodeMailer(from, to, FromName, subject, null, htmlbody);
        return {
            status: true,
            message: 'Please complete your registration using the one time password sent to your email',
            body: null
        };
    }

    async verifyCustomer(request: VerifyCustomerRequest): Promise<BaseResponse> {
        //fetch user by email
        let user: User = null;
        try {
            user = await this._userRepository.findOne({ where: { email: request.email } });
        } catch (error) {
            Logger.error(`ERROR_CustomerService.verifyCustomer: Error fetching user ${error}`);
            throw new InternalServerErrorException(ResponseMessages.ERROR);
        }

        if (user == null) {
            throw new UnprocessableEntityException("Invalid user account");
        }
        //fetch saved encrypted otp
        let savedEncryptedCode: EncryptedCode = null;
        try {
            savedEncryptedCode = await this._encryptedCodeRepo.findOne({ where: { user: user } });
        } catch (error) {
            Logger.error(`ERROR_CustomerService.verifyCustomer: Error fetching encryption code ${error}`);
            throw new InternalServerErrorException(ResponseMessages.ERROR);
        }
        await this._userService.verifyOtp(savedEncryptedCode, request.otp);
        user.isActive = true;
        user.isEmailConfirmed = true;

        try {
            await getManager().transaction(async transactionalEntityManager => {
                await transactionalEntityManager.save(savedEncryptedCode);
                await transactionalEntityManager.save(user);
                // ...
            });
        } catch (error) {
            Logger.error(`ERROR_CustomerService.verifyCustomer: Error while verifying customer otp: ${error}`);
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
