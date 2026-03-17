import { FileInterceptor } from "@nestjs/platform-express";

import { AdminService } from "./admin.service";
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { diskStorage } from "multer";
import { UserEntity } from "src/user.entity";
import type { Role, Status } from "src/user.entity";
import { UserDTO } from "src/user.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller('admin')
export class AdminController {

    constructor(private readonly adminService: AdminService) { }


    @UsePipes(new ValidationPipe())
    @Post('create_user')
    @UseInterceptors(FileInterceptor('User-CV', {
        fileFilter: (req, file, callback) => {
            if (file.originalname.match(/^.*\.(pdf)$/)) {
                callback(null, true)
            } else {
                callback(new Error("only pdfs are allowed"), false)
            }
        },
        limits: { fileSize: 2 * 1024 * 1024 },
        storage: diskStorage({
            destination: './uploads/CV/',
            filename: (req, file, callback) => {
                const fileRename = 'User-CV-' + Date.now() + '-' + file.originalname
                callback(null, fileRename)
            }
        })
    }))
    createEmplye(@Body() newUser: UserDTO, @UploadedFile() file: Express.Multer.File): Promise<UserEntity> {
        return this.adminService.CreateUser(newUser, file)
    }

    @UseGuards(AuthGuard)
    @Get("/get_all_users")
    GetAllUsers(): Promise<UserEntity[]| null> {
        return this.adminService.GetAllUsers();
    }

    @Get("/get_user_by_email/:email")
    GetUserById(@Param('email') email: UserDTO["email"]): Promise<UserEntity | null> {
        return this.adminService.GetUserById(email);
    }

    @Get("/get_users_by_role_status")
    GetUsersByRoleStatus(@Query('role') role: Role, @Query('status') status: Status): Promise<UserEntity[] | null> {
        return this.adminService.GetUsersByRoleStatus(role, status);
    }

    @Patch("/update_user_status")
    UpdateUserStatus(@Body('id') id: string, @Body('status') status: Status): Promise<UserEntity | null> {
        return this.adminService.UpdateUserStatus(id, status)
    }

    @Put("/update_admin_profile")
    UpdateAdminProfile(@Body() updatedInfo: UserDTO): Promise<UserEntity | null> {
        return this.adminService.UpdateAdminProfile(updatedInfo)
    }

    @Delete("/delete_user/:id")
    DeleteUser(@Param('id') id: string): Promise<{ message: string }> {
        return this.adminService.DeleteUser(id)
    }

    @Post("create_transaction")
    CreateTransaction(@Body() newTransaction: any): Promise<any> {
        return this.adminService.CreateTransaction(newTransaction);
    }

}