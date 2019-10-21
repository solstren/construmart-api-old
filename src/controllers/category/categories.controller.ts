import { AppConstants } from '../../utils/app-constants';
import { Category } from '../../models/entities/category.entity';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags(AppConstants.ADMIN_SWAGGER_TAG)
@Controller(`${AppConstants.APP_BASE_URL}categories`)
export class CategoriesController {
    constructor(private _categoryService: CategoriesService) { }

    @Get('/:id')
    async getById(@Param('id', ParseIntPipe) id: number): Promise<Category> {
        return this._categoryService.getCategoryById(id);
    }

    @Get()
    async getAll(): Promise<Category> {
        throw new Error('Not Implemented');
    }
}
