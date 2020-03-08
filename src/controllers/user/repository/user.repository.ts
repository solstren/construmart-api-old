import { User } from './../../../entities/user.entity';
import { Repository, Entity, EntityRepository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async hasUser(email: string): Promise<boolean> {
        var userCount = await this.createQueryBuilder('user')
            .where('user.email = :userEmail', {
                userEmail: email
            })
            .getCount();
        if (userCount <= 0) return false;
        return true;
    }
}