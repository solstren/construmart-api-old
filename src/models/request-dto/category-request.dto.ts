import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDefined } from 'class-validator';
import { File } from '@babel/types';

export class CategoryRequestDto {
	@ApiModelProperty({ type: String, required: true, nullable: false })
	@IsNotEmpty()
	@IsDefined()
	readonly name: string;

	@ApiModelProperty({ required: false, type: String })
	readonly description?: string;

	@ApiModelProperty({ required: false, description: 'the image file to be sent via form-data' })
	readonly imageFile?: any;
}