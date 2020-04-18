import { User, UserType } from './../user.entity';
import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from "bcrypt";

export class seedAdmin1587212173436 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        var admin = new User();
        admin.email = process.env.ADMIN_EMAIL;
        admin.isActive = true;
        admin.isEmailConfirmed = true;
        admin.phoneNumber = process.env.ADMIN_PHONE;
        admin.isPhoneNumberConfirmed = true;
        admin.password = await bcrypt.hash(process.env.ADMIN_PASSWORD, await bcrypt.genSalt());
        admin.userType = UserType.ADMIN;
        queryRunner.manager.save(admin);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        queryRunner.manager.delete(User, { email: process.env.ADMIN_EMAIL });
    }

}
