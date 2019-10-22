import { AppConstants } from '../../utils/app-constants';
import { Category } from '../../entities/category.entity';
import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { ApiUseTags } from '@nestjs/swagger';


@Controller(`${AppConstants.APP_BASE_URL}categories`)
export class CategoriesController {
    constructor(private _categoryService: CategoriesService) { }

    @ApiUseTags(AppConstants.SWAGGER_ADMIN_TAG, AppConstants.SWAGGER_CUSTOMER_TAG)
    @Get('/:id')
    async getById(@Param('id', ParseIntPipe) id: number): Promise<Category> {
        return this._categoryService.getCategoryById(id);
    }

    @ApiUseTags(AppConstants.SWAGGER_ADMIN_TAG, AppConstants.SWAGGER_CUSTOMER_TAG)
    @Get()
    async getAll(): Promise<Category> {
        throw new Error('Not Implemented');
    }

    @ApiUseTags(AppConstants.SWAGGER_ADMIN_TAG)
    @Post()
    async post(): Promise<Category> {
        throw new Error('Not Implemented');
    }
}
