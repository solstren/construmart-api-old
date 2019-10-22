import { Category } from '../../../entities/category.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(Category)
export class CategoriesRepository extends Repository<Category> {

}