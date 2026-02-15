import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ManagerModule } from './manager/manager.module';

@Module({
  imports: [ManagerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
