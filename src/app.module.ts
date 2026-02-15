import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { AccountantModule } from './accountant/ccountant.module';
import { ManagerModule } from './manager/manager.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [EmployeeModule,AccountantModule,ManagerModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
