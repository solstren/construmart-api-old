import { Customer } from './../../../entities/customer.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer>{
}
