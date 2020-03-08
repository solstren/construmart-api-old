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

@Module({
    imports: [
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
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule { }
