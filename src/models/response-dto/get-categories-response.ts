import { BaseResponse } from './base-response';
import { Category } from './../../entities/category.entity';
import { ApiModelProperty } from '@nestjs/swagger';
export class GetCategoriesResponse extends BaseResponse{
//   @ApiModelProperty({ isArray: true })
//   body: Category[];
}
