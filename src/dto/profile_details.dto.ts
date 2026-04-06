import {
  IsNotEmpty,
  Matches,
  IsDateString,
  IsUrl,
  MinLength,
  MaxLength,
} from 'class-validator';

export class ProfileDetailsDto {
  @IsNotEmpty({ message: 'Name is required' })
  @Matches(/^[^0-9]*$/, {
    message: 'Name should not contain numbers',
  })
  @MaxLength(96)
  name: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  @MaxLength(14, {
    message: 'Password must be at most 14 characters long',
  })
  @Matches(/[@#$&]/, {
    message: 'Password must contain at least one special character (@, #, $, &)',
  })
  password: string;

  @IsNotEmpty({ message: 'Date is required' })
  @IsDateString(
    {},
    {
      message: 'Must be a valid date (YYYY-MM-DD format)',
    },
  )
  birthDate: string;

  @IsNotEmpty({ message: 'Social link is required' })
  @IsUrl(
    {},
    {
      message: 'Must be a valid URL like https://example.com',
    },
  )
  socialLink: string;
}
