import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { AppConstants } from '../utils/app-constants';
import { CoreModule } from '../core/core.module';

@Module({
    imports: [],
})
export class ModelsModule { }
