import { UserType } from './../../entities/user.entity';

export class AuthUserDto {
    readonly userId: number;
    readonly email: string;
    readonly role: number;
}
