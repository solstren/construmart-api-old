import { BaseResponse } from './base-response';
import { Category } from '../../entities/category.entity';
import { ProductResponse } from './product-response';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDefined } from 'class-validator';

export class CategoryResponseDto {
	@ApiModelProperty({ type: Number, uniqueItems: true })
	id: number;

	@ApiModelProperty({ required: true })
	readonly name: string;

	@ApiModelProperty() readonly description?: string;

	@ApiModelProperty() imageFileName?: any;

	@ApiModelProperty({ type: Date })
	readonly dateCreated?: Date;

	@ApiModelProperty({ type: Date })
	readonly dateUpdated?: Date;

	@ApiModelProperty({ type: Number })
	readonly rowVersion: number;

	@ApiModelProperty({
		type: Number,
		isArray: true,
		uniqueItems: true,
		description: 'The IDs of the related products'
	})
	readonly productIDs: number[];
}
