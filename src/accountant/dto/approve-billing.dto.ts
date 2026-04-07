import { IsOptional, IsString, Length } from 'class-validator';

export class ApproveBillingDto {
  @IsString()
  accountantId: string;

  @IsOptional()
  @IsString()
  @Length(3, 300)
  approvalNote?: string;
}
