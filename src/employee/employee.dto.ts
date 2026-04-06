import { IsEmail, IsString, MinLength, Matches, IsIn, Min, IsDateString, IsOptional, IsInt } from 'class-validator';



export class CreateEmployeeDto {
 @IsString()
 name!: string;

 @IsEmail()
 email!: string;

 @IsString()
 password!: string;
}

export class UpdateProfileDto {
 @IsOptional()
 @IsString()
 name?: string;

 @IsOptional()
 @IsString()
 country?: string;
}



export class CreateUserDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password !: string;

  @IsString()
  @IsIn(['manager', 'employee', 'supplier'])
  role!: string;
}

export class CreateOrderDto {
  @IsString()
  productName!: string;

  @IsInt()
  @Min(1)
  quantity!: number

  @IsInt()
  @Min(1)
  price!: number;

  @IsInt()
  taskId!: number;

  @IsInt()
  employeeId!: number;

  @IsInt()
  supplierId!: number;

//   @IsEmail()
//   supplierEmail!: string;
}

// ================= UPDATE ORDER =================
export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  productName?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  quantity?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  price?: number;
}

// ================= UPDATE TASK =================
export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  status?: string;
}

















// export class CreateUserDto {

//   @IsOptional()
//   @IsString()
//   country?: string;

// }

// export class UpdateCountryDto {

//   @IsString()
//   country: string;

// }

// export class DateDto {

//   @IsDateString()
//   joiningDate: string;

// }


// export class CreateExpenseDto {
//   amount: number;
//   description: string;
// }
// export class CreateInvoiceDto {
//   clientName: string;
//   amount: number;
// }
// export class UpdateExpenseDto {
//   amount?: number;
//   description?: string;
// }



// export class RegisterationDto {

//   @IsEmail()
//   @Matches(/@aiub\.edu$/, { message: 'Email must end with @aiub.edu' })
//   email: string;

//   // @IsString()
//   // @MinLength(6)
//   // @Matches(/[A-Z]/)
//   // password: string;

//   // @IsIn(['male', 'female'], { message:'Invalid Gender'})
//   // gender: string;

//   @Matches(/^[0-9]+$/)
//   @MinLength(11)
//   phone: string;
// }