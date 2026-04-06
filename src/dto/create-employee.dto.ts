import { IsString, IsNotEmpty, Length } from 'class-validator';

export class ManageEmployeeDto {
  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  @Length(1, 100)
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Full name is required' })
  @Length(1, 150)
  fullName: string;
}
