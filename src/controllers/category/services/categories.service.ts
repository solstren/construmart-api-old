import { AppConstants } from './../../../utils/app-constants';
import { CategoryResponse } from './../../../models/response-dto/category-response';
import { BaseResponse } from '../../../models/response-dto/base-response';
import { Category } from '../../../entities/category.entity';
import { Injectable, NotFoundException, InternalServerErrorException, HttpException, HttpService, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesRepository } from '../repositories/categories.repository';
import { CategoryRequest } from '../../../models/request-dto/category-request';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesRepository)
    private readonly _categoryRepo: CategoriesRepository,
  ) {}

  async getCategoryById(id: number): Promise<BaseResponse> {
    const categoryRes: CategoryResponse = await this._categoryRepo.findOne(id, {
      relations: ['products'],
      order: { name: 'ASC' },
    });
    if (!categoryRes) {
      throw new NotFoundException(`Category with id "${id}" not found`);
    }
    return {
      body: categoryRes,
      status: true,
      message: 'success',
    };
  }

  async getAllCategories(order: string): Promise<BaseResponse> {
    let categoriesRes: CategoryResponse[];
    try {
        if (order.toUpperCase() === AppConstants.ORDER_DESC) {
            categoriesRes = await this._categoryRepo.find({order: {name: 'DESC'}});
          } else {
            categoriesRes = await this._categoryRepo.find({
              order: {name: 'ASC'},
            });
          }
    } catch (ex) {
        const response: BaseResponse = {
            body: null,
            status: false,
            message: 'An error occured',
        };
        throw new HttpException(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return {
        body: categoriesRes,
        status: true,
        message: 'success',
    }
  }

  async createCategory(categoryReq: CategoryRequest): Promise<BaseResponse> {
    const category = this._categoryRepo.create(categoryReq);
    await this._categoryRepo.save(category);
    return {
      body: category,
      status: true,
      message: 'success',
    };
  }
}
