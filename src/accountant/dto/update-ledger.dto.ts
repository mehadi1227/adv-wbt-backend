import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { LedgerEntryType } from '../accountant.enums';

export class UpdateLedgerDto {
  @IsOptional()
  @IsString()
  @Length(3, 120)
  accountTitle?: string;

  @IsOptional()
  @IsString()
  @Length(3, 500)
  description?: string;

  @IsOptional()
  @IsEnum(LedgerEntryType)
  entryType?: LedgerEntryType;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  amount?: number;

  @IsOptional()
  @IsDateString()
  entryDate?: string;

  @IsOptional()
  @IsString()
  @Length(2, 60)
  referenceNo?: string;
}
