import { CategoryResponse } from './category-response';
export interface ProductResponse {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: CategoryResponse; 
}