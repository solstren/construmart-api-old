import { IsDefined, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ChangePasswordRequestDto {
    @ApiModelProperty({ required: true, type: String, nullable: false })
    @IsDefined()
    @IsNotEmpty()
    readonly oldPassword: string;

    @ApiModelProperty({ type: String, required: true, nullable: false })
    @IsDefined()
    @IsNotEmpty()
    readonly newPassword: string;
}