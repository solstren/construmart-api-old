import { ProductResponse } from "./product-response";

export class CategoryResponse {

    constructor(
        public name: string,
        public description: string,
        public imageUrl: string,
        public products: ProductResponse[],
    ) { }
}