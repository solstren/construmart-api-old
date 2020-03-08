import { NotificationService } from './notification.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
    ],
    providers: [NotificationService],
})
export class CoreModule { }
