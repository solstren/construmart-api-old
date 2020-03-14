import { IsNotEmpty, IsDefined, IsMobilePhone, IsPhoneNumber, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
export class CreateCustomerRequest {
    @ApiModelProperty({ type: String, required: true, nullable: false })
    @IsDefined()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiModelProperty({ required: true, type: String })
    @IsDefined()
    @IsNotEmpty()
    readonly firstname: string;

    @ApiModelProperty({ required: true, type: String })
    @IsDefined()
    @IsNotEmpty()
    readonly lastname: string;

    @ApiModelProperty({ required: true, type: String })
    @IsDefined()
    @IsNotEmpty()
    @IsPhoneNumber("NG", { message: "invalid phone number" })
    readonly phoneNumber: string;

    @ApiModelProperty({ required: true, type: String })
    @IsDefined()
    @IsNotEmpty()
    readonly password: string;
}