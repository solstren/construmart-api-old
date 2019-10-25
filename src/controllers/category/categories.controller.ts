import { BaseResponse } from './../../models/response-dto/base-response';
import { AppConstants } from '../../utils/app-constants';
import { Category } from '../../entities/category.entity';
import { Controller, Get, Param, ParseIntPipe, Post, Body } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { ApiUseTags } from '@nestjs/swagger';
import { CreateCategoryDto } from '../../models/request-dto/create-category-dto';


@Controller(`${AppConstants.APP_BASE_URL}categories`)
export class CategoriesController {
    constructor(private _categoryService: CategoriesService) { }

    @ApiUseTags(AppConstants.SWAGGER_ADMIN_TAG, AppConstants.SWAGGER_CUSTOMER_TAG)
    @Get('/:id')
    async getCategoryById(@Param('id', ParseIntPipe) id: number): Promise<BaseResponse> {
        return await this._categoryService.getCategoryById(id);
    }

    @ApiUseTags(AppConstants.SWAGGER_ADMIN_TAG, AppConstants.SWAGGER_CUSTOMER_TAG)
    @Get()
    async getAllCategories(): Promise<Category> {
        throw new Error('Not Implemented');
    }

    @ApiUseTags(AppConstants.SWAGGER_ADMIN_TAG)
    @Post()
    async postCategory(@Body() request: CreateCategoryDto): Promise<BaseResponse> {
        return await this._categoryService.createCategory(request);
    }
}
