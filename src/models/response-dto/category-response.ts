import { ProductResponse } from "./product-response";

export interface CategoryResponse {
    name: string;
    description: string;
    imageUrl: string;
    products: ProductResponse[];
}