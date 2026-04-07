import { IsDateString, IsOptional } from 'class-validator';

export class ExpenseQueryDto {
  @IsOptional()
  @IsDateString()
  from?: string;

  @IsOptional()
  @IsDateString()
  to?: string;
}
