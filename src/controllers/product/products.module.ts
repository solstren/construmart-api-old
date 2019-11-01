import {Module} from '@nestjs/common';
import { clearScreenDown } from 'readline';
import { ProductController } from './products.controller';
import { ProductsService } from './services/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from './repositories/products.repository';

@Module({
    controllers: [ProductController],
    imports: [TypeOrmModule.forFeature([ProductsRepository])],
    providers: [ProductsService],
})

export class ProductsModule{}