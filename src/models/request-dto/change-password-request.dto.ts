import { IsDefined, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ChangePasswordRequest {
    @ApiModelProperty({ type: String, required: true, nullable: false })
    @IsDefined()
    @IsNotEmpty()
    @IsEmail()
    readonly oldPassword: string;

    @ApiModelProperty({ type: String, required: true, nullable: false })
    @IsDefined()
    @IsNotEmpty()
    @IsEmail()
    readonly newPassword: string;
}