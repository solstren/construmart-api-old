import { CategoriesRepository } from './repositories/categories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './categories.controller';
import { Module } from '@nestjs/common';

@Module({
    controllers: [CategoriesController],
    imports: [TypeOrmModule.forFeature([CategoriesRepository])],
    providers: [CategoriesService],
})
export class CategoriesModule {}
