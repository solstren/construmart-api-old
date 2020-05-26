import { UserType } from './../../entities/user.entity';
import { IsNotEmpty, IsDefined, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CompleteResetPasswordRequestDto {
    @ApiModelProperty({ type: String, required: true, nullable: false })
    @IsDefined()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiModelProperty({ type: Number, required: true, nullable: false, description: '1 for ADMIN, 2 for CUSTOMER' })
    @IsDefined()
    @IsNotEmpty()
    readonly role: UserType;

    @ApiModelProperty({ type: String, required: true, nullable: false })
    @IsDefined()
    @IsNotEmpty()
    readonly otp: string;

    @ApiModelProperty({ type: String, required: true, nullable: false })
    @IsDefined()
    @IsNotEmpty()
    readonly newPassword: string;
}
