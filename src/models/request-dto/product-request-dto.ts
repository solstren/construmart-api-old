import { ApiModelProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsCurrency, IsString, IsNumber } from 'class-validator';
import { isDeclareTypeAlias } from '@babel/types';

export class ProductRequestDto {
	@ApiModelProperty({ required: true, type: String, nullable: false })
	@IsNotEmpty()
	@IsDefined()
	name: string;

	@ApiModelProperty({ type: String })
	description: string;

	@IsCurrency({ allow_decimal: true, thousands_separator: ',', decimal_separator: ',' })
	@ApiModelProperty({ required: false, type: Number, description: 'the image file to be sent via form-data' })
	price: number;

	@ApiModelProperty({ required: false, description: 'the image file to be sent via form-data' })
	readonly imageFile?: any;

	@ApiModelProperty({ required: false, nullable: true, description: 'The name of the image file with extension' })
	imageFileName?: string;

	@IsDefined()
	@IsNotEmpty()
	@ApiModelProperty({ required: true, type: Number, description: 'the id of the category the product belongs to' })
	categoryId: number;
}
