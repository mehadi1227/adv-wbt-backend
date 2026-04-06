import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from 'node_modules/@nestjs-modules/mailer/dist/mailer.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [EmployeeModule,  TypeOrmModule.forRoot({
      type: 'postgres',              
      host: 'localhost',            
      port: 5432,                    
      username: 'postgres',          
      password: '@11111@',          
      database: 'secc',     
      autoLoadEntities: true,       
      synchronize: true,             
    }),
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
  }),
      AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
