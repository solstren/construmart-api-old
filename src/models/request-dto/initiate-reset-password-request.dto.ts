import { UserType } from './../../entities/user.entity';
import { IsDefined, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class InitiateResetPasswordRequestDto {
    @ApiModelProperty({ type: String, required: true, nullable: false })
    @IsDefined()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiModelProperty({ type: Number, required: true, nullable: false, description: '1 for ADMIN, 2 for CUSTOMER' })
    @IsDefined()
    @IsNotEmpty()
    readonly role: UserType;
}
