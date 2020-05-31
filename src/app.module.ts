import { CategoriesModule } from './controllers/category/categories.module';
import { CategoriesController } from './controllers/category/categories.controller';
import { JwtAuthGuard } from './shared/jwt.auth.guard';
import { RolesGuard } from './shared/roles.auth.guard';
import { TagModule } from './controllers/tag/tag.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { } from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from './core/core.module';
import { ConfigModule } from './config/config.module';
import { ProductModule } from './controllers/product/products.module';
import { InventoryModule } from './controllers/inventory/inventory.module';
import { InventoryHistoryModule } from './controllers/inventory-history/inventory-history.module';
import { UserModule } from './controllers/user/user.module';
import { CustomerModule } from './controllers/customer/customer.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [
        CategoriesModule,
        TypeOrmModule.forRoot(),
        CoreModule,
        ConfigModule,
        ProductModule,
        InventoryModule,
        InventoryHistoryModule,
        TagModule,
        UserModule,
        CustomerModule
    ],
    controllers: [
        AppController
    ],
    providers: [
        AppService,
        // {
        //     provide: APP_GUARD,
        //     useClass: JwtAuthGuard
        // },
        // {
        //     provide: APP_GUARD,
        //     useClass: RolesGuard
        // }
    ],
})
export class AppModule { }
