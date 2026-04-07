import { IsEnum, IsOptional } from 'class-validator';
import { BillingStatus, PaymentStatus } from '../accountant.enums';

export class BillingFilterDto {
  @IsOptional()
  @IsEnum(BillingStatus)
  status?: BillingStatus;

  @IsOptional()
  @IsEnum(PaymentStatus)
  paymentStatus?: PaymentStatus;
}
