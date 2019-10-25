import { AppConstants } from './../../../utils/app-constants';
import { CategoryResponse } from './../../../models/response-dto/category-response';
import { BaseResponse } from '../../../models/response-dto/base-response';
import { Category } from '../../../entities/category.entity';
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  HttpException,
  HttpService,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesRepository } from '../repositories/categories.repository';
import { CreateCategoryDto } from '../../../models/request-dto/create-category-dto';
import { ResponseMessages } from '../../../utils/response-messages';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesRepository)
    private readonly _categoryRepo: CategoriesRepository,
  ) {}

  async getCategoryById(id: number): Promise<BaseResponse> {
    const category: Category = await this._categoryRepo.findOne(id, {
      relations: ['products'],
      order: { name: 'ASC' },
    });
    if (!category) {
      throw new NotFoundException(`Category with id "${id}" not found`);
    }
    return {
      body: category,
      status: true,
      message: 'success',
    };
  }

  async getAllCategories(): Promise<BaseResponse> {
    let categoriesRes: Category[];
    let categories: Category[];
    try {
      categories = await this._categoryRepo.find({
        order: { name: 'ASC' },
      });
    //   categories.forEach(category => {
    //       const singleCategory: CategoryResponse = category;
    //       categoriesRes.push();
    //   });
    } catch (ex) {
      const response: BaseResponse = {
        body: null,
        status: false,
        message: 'An error occured',
      };
      throw new HttpException(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return {
      body: categories,
      status: true,
      message: ResponseMessages.SUCCESS,
    };
  }

  async createCategory(categoryReq: CreateCategoryDto): Promise<BaseResponse> {
    // check if category exists
    const duplicateCount = await this._categoryRepo.findAndCount({
      where: { name: { value: categoryReq.name } },
    });

    if (duplicateCount[1] >= 1) {
      throw new HttpException(
        ResponseMessages.CATEGORY_EXISTS,
        HttpStatus.BAD_REQUEST,
      );
    }
    const category = new Category();
    category.name = categoryReq.name;
    category.imageUrl = categoryReq.imageUrl;
    category.description = categoryReq.description;

    await this._categoryRepo.save(category);
    return {
      body: category,
      status: true,
      message: ResponseMessages.SUCCESS,
    };
  }
}
