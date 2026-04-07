import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Type } from 'class-transformer';
// import { EmployeeEntity } from './employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { Employee, Order, Task } from './employee.entity';
import { User } from './entity/user.entity';
import { Task } from './entity/task.entity';
import { Order } from './entity/order.entity';
import { Payment } from './entity/payment.entity';      
import { MailerModule } from 'node_modules/@nestjs-modules/mailer/dist/mailer.module';

@Module({
 // imports: [TypeOrmModule.forFeature([Employee, Order, Task])],
  imports: [TypeOrmModule.forFeature([User, Task, Order, Payment]),
MailerModule.forRoot({
   transport: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
     user: 'ahammodr74@gmail.com',
     pass: 'mlpbcatrtnldhhct',
    },
   },
  }),],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}