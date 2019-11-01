import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../../entities/product.entity';
import { ProductsRepository } from '../repositories/products.repository';

@Injectable()
export class ProductsService {
	
    constructor(@InjectRepository(ProductsRepository) private readonly _productRepo: ProductsRepository) {}
    
}
