import { Category } from '../entities/category.entity';
import { CategoryResponseDto } from '../models/response-dto/category-response-dto';

export class ObjectMapper {
	public static mapToCategoryResponse(category: Category): CategoryResponseDto {
		let productIDs: number[];
		category.products.forEach((value, index, products) => productIDs.push(value.id));
		//map to response
		const response: CategoryResponseDto = {
			id: category.id,
			name: category.name,
			description: category.description,
			imageFileName: category.imageName,
			dateCreated: category.dateCreated,
			dateUpdated: category.dateUpdated,
			rowVersion: category.rowVersion,
			productIDs: productIDs
		};
		return response;
	}
}
