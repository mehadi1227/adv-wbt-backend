import { IsEmail, IsEmpty, IsIn, IsNotEmpty, IsString, IsUUID, Matches } from "class-validator";
import type { Role, Status } from "./entities/user.entity";


export class UserDTO {

    id: string

    @IsNotEmpty({message: "Name is required"})
    @IsString({message: "Name must be a string"})
    @Matches(/^[a-zA-Z\s]+$/, {message: "Name can not contain any numbers or special characters"})
    name: string

    @IsNotEmpty({message: "Email is required"})
    @IsEmail({}, {message: "Email must be a valid email address"})
    email: string

    @IsNotEmpty({message: "Password is required"})
    @Matches(/^.{6,}$/, {message: "Password must be at least 6 characters"})
    password: string

    @IsNotEmpty({message: "Role is required"})
    @IsIn(["admin", "employee", "manager", "accountant", "supplier"], {message: "Invalid Role type"})
    role: Role

    @IsIn(["active", "inactive", "blocked", "reset"], {message: "Invalid Status type"})
    status: Status

    cv_path: string

}

export class UpdateUserDTO{
    
    @IsNotEmpty({message: "Id is required"})
    id: string

    @IsNotEmpty({message: "Full name is required"})
    @IsString({message: "Full name must be a string"})
    @Matches(/^[a-zA-Z\s]+$/, {message: "Full name can not contain any numbers or special characters"})
    full_name: string

    @IsNotEmpty({message: "Email is required"})
    @IsEmail({}, {message: "Email must be a valid email address"})
    email: string

    @IsNotEmpty({message: "Password is required"})
    @Matches(/^.{6,}$/, {message: "Password must be at least 6 characters"})
    password: string

    @IsNotEmpty({message: "Address is required"})
    address: string

    @IsNotEmpty({message: "Designation is required"})
    designation: string
}

export class CreateUserDTO{
    @IsNotEmpty({message: "Full name is required"})
    @IsString({message: "Full name must be a string"})
    @Matches(/^[a-zA-Z\s]+$/, {message: "Full name can not contain any numbers or special characters"})
    full_name: string

    @IsNotEmpty({message: "Email is required"})
    @IsEmail({}, {message: "Email must be a valid email address"})
    email: string

    @IsNotEmpty({message: "Password is required"})
    @Matches(/^.{6,}$/, {message: "Password must be at least 6 characters"})
    password: string

    @IsNotEmpty({message: "Role is required"})
    @IsIn(["admin", "employee", "manager", "accountant", "supplier"], {message: "Invalid Role type"})
    role: Role
}

export class LoginUserDTO {
    @IsNotEmpty({message: "Email is required"})
    @IsEmail({}, {message: "Email must be a valid email address"})
    email: string

    @IsNotEmpty({message: "Password is required"})
    @Matches(/^.{6,}$/, {message: "Password must be at least 6 characters"})
    password: string
}