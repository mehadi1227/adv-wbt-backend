import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsNumberString, IsString, Length, Matches } from "class-validator"


// export class EmployeDto{
//      id: string

//     @IsNotEmpty()
//     @IsString()
//     @Matches(/^[a-zA-Z ]+$/, {message: "Name can only contain alphabts"})
//     name: string
    
//     @IsNotEmpty()
//     @IsEmail({},{message: "Invalid email"})
//     // @Matches(/^[^\s@]+@[^\s@]+\.tech$/, {message: "Email must be end with .tech"})
//     email: string

    
//     @IsNumberString()
//     @Matches(/^\d{10}$|^\d{17}$/, {message: "NID can only contain 10 or 17 digits"})
//     NID: string

//     role: string
//     status: string
// }

export type status = "active" | "inactive"
export type role = "manager" | "employee" | "accountant" | "supplier"

export class UserDTO{
    id: number

    @IsNotEmpty({message: "Full name cannot be empty"})
    @Matches(/^[a-zA-Z ]+$/, {message: "full name field only accepts aplhabets"})
    fullName: string

    @IsNotEmpty({message: "Age cannot be empty"})
    @IsNumber({},{message: "Age can only contain numbers"})
    age: number
    
    @IsNotEmpty({message: "Email cannot be empty"})
    @IsEmail({},{message: "Invalid email"})
    email: string
    
    // @IsNotEmpty({message: "Status cannot be empty"})
    // @IsIn(["active" , "inactive"])
    status: status
    
    @IsNotEmpty({message: "Role cannot be empty"})
    @Matches(/^(manager|employee|accountant|supplier)$/)
    role: role
    name: string
    password: string
}