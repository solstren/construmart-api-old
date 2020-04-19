import { IsDefined, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { UserType } from '../../entities/user.entity';
import { EncryptionCodePurpose } from '../../entities/encrypted-code.entity';

export class ResendOtpRequest {
    @ApiModelProperty({ type: String, required: true, nullable: false })
    @IsDefined()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiModelProperty({ type: Number, required: true, nullable: false, description: '1 for ADMIN, 2 for CUSTOMER' })
    @IsDefined()
    @IsNotEmpty()
    readonly role: UserType;

    @ApiModelProperty({ type: Number, required: true, nullable: false, description: '1 for CUSTOMER ONBOARDING, 2 for FORGOT PASSWORD' })
    @IsDefined()
    @IsNotEmpty()
    readonly purpose: EncryptionCodePurpose;
}