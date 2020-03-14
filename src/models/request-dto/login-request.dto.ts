import { IsDefined, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginRequest {

    @ApiModelProperty({ type: String, required: true, nullable: false })
    @IsDefined()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiModelProperty({ type: String, required: true, nullable: false })
    @IsDefined()
    @IsNotEmpty()
    readonly password: string;

    @ApiModelProperty({ type: Number, required: true, nullable: false, description: '1 for ADMIN, 2 for CUSTOMER' })
    @IsDefined()
    @IsNotEmpty()
    readonly role: number;
}