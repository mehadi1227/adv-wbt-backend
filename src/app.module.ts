import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerModule } from './manager/manager.module';
import { EmployeeModule } from './employee/employee.module';
import { AccountantModule } from './accountant/ccountant.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AdminModule,ManagerModule,EmployeeModule, AccountantModule,AuthModule, TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password here ...",
    database: "database name here ...",
    autoLoadEntities: true,
    synchronize: true
  })]
})
export class AppModule {}
