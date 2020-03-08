import { NotificationService } from './notification.service';
import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [HttpModule.register({
        timeout: 5000,
        maxRedirects: 5
    })],
    providers: [NotificationService],
    exports: [NotificationService]
})
export class CoreModule { }
