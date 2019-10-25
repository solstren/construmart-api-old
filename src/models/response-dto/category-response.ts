import { BaseResponse } from './base-response';
import { Category } from './../../entities/category.entity';
import { ProductResponse } from './product-response';
import { ApiModelProperty } from '@nestjs/swagger';

export class CategoryResponse extends BaseResponse {
  readonly name: string;
  readonly description: string;
  readonly imageUrl: string;
  readonly products: ProductResponse[];
}
