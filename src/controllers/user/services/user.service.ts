import { UserRepository } from './../repository/user.repository';
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository) private readonly _inventoryRepo: UserRepository,
    ) { }
}