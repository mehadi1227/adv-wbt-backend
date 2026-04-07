import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsPositive, IsString, Length } from 'class-validator';
import { PaymentMethod } from '../accountant.enums';

export class ProcessTransactionDto {
  @IsString()
  billingId: string;

  @IsString()
  accountantId: string;

  @Type(() => Number)
  @IsPositive()
  amount: number;

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @IsOptional()
  @IsString()
  @Length(3, 300)
  note?: string;
}
