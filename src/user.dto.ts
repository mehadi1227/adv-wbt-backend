import { IsEmail, IsEmpty, IsIn, IsNotEmpty, IsString, IsUUID, Matches } from "class-validator";
import type { Role, Status } from "./user.entity";

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

    status: Status

    cv_path: string

}