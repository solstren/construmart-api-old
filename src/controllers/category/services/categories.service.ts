import { BaseResponse } from '../../../models/response-dto/base-response';
import { Category } from '../../../entities/category.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesRepository } from '../repositories/categories.repository';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(CategoriesRepository)
        private readonly _categoryRepo: CategoriesRepository) { }

    async getCategoryById(id: number): Promise<BaseResponse> {
        const category = await this._categoryRepo.findOne(id, { relations: ['products'], order: {name: 'ASC'} });
        if (!category) {
            throw new NotFoundException(`Category with id "${id}" not found`);
        }
        return new BaseResponse(category, true, 'success');
    }

    async createCategory(category: Category ): Promise<BaseResponse> {
        await this._categoryRepo.create()
    }
}