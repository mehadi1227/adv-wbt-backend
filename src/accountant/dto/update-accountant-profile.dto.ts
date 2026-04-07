import { IsBoolean, IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateAccountantProfileDto {
  @IsOptional()
  @IsString()
  @Length(3, 150)
  fullName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(7, 20)
  phone?: string;

  @IsOptional()
  @IsString()
  @Length(5, 255)
  address?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
