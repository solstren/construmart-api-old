import { Category } from '../../../models/entities/category.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesRepository } from '../repositories/categories.repository';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(CategoriesRepository)
        private readonly _categoryRepo: CategoriesRepository) { }

    async getCategoryById(id: number): Promise<Category> {
        const category = await this._categoryRepo.findOne(id, { order: { name: 'ASC' } });
        if (!category) {
            throw new NotFoundException(`Category with id "${id}" not found`);
        }
        return category;
    }
}
