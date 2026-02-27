export class CreateExpenseDto {
  amount: number;
  description: string;
}
export class CreateInvoiceDto {
  clientName: string;
  amount: number;
}
export class UpdateExpenseDto {
  amount?: number;
  description?: string;
}

import { IsEmail, IsString, MinLength, Matches, IsIn, Min } from 'class-validator';

export class RegisterationDto {

  @IsEmail()
  @Matches(/@aiub\.edu$/, { message: 'Email must end with @aiub.edu' })
  email: string;

  @IsString()
  @MinLength(6)
  @Matches(/[A-Z]/)
  password: string;

  @IsIn(['male', 'female'], { message:'Invalid Gender'})
  gender: string;

  @Matches(/^[0-9]+$/)
  @MinLength(11)
  phone: string;
}