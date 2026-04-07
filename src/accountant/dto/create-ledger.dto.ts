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

export class CreateLedgerDto {
  @IsString()
  accountantId: string;

  @IsString()
  @Length(3, 120)
  accountTitle: string;

  @IsString()
  @Length(3, 500)
  description: string;

  @IsEnum(LedgerEntryType)
  entryType: LedgerEntryType;

  @Type(() => Number)
  @IsPositive()
  amount: number;

  @IsDateString()
  entryDate: string;

  @IsOptional()
  @IsString()
  @Length(2, 60)
  referenceNo?: string;
}
