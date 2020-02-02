import { CategoryResponseDto } from './category-response-dto';
import { TagResponse } from './tag-response';
export class ProductResponse {
    id: number;
    name: string;
    description: string;
    price: number;
    imageName: string;
    categoryName: string;
    categoryId: number;
    dateCreated: Date;
    dateUpdated: Date;
    tag: TagResponse;
}