import { CategoryResponseDto } from './category-response-dto';
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
}