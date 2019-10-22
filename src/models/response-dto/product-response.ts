import { CategoryResponse } from './category-response';
export class ProductResponse {

    constructor(
        public name: string,
        public description: string,
        public price: number,
        public imageUrl: string,
        public category: CategoryResponse,
    ) {}
}