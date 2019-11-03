import { CategoryResponseDto } from './category-response-dto';
export interface ProductResponse {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: CategoryResponseDto; 
}