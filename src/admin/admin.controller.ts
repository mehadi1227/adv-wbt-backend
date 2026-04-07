import { FileInterceptor } from "@nestjs/platform-express";

import { AdminService } from "./admin.service";
import {  Body, Controller, Delete, Get,  Param, Patch, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { diskStorage } from "multer";
import { UserEntity } from "src/admin/entities/user.entity";
import type { Role, Status } from "src/admin/entities/user.entity";
import { CreateUserDTO, UpdateUserDTO, UserDTO } from "src/admin/user.dto";
import { AdminGuard } from "./admin.guard";
import { ActivityEntity } from "./entities/activity.enitity";
import { TransactionEntity, type TransactionStatus } from "./entities/transaction.entity";
import type { Request } from "express";

@Controller('admin')
export class AdminController {

    constructor(private readonly adminService: AdminService) { }


    @UseGuards(AdminGuard)
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
    createEmplye(@Body() newUser: CreateUserDTO, @UploadedFile() file: Express.Multer.File, @Req() request: Request): Promise<ActivityEntity> {
        const adminID = request['user'].sub.profileId;
        return this.adminService.CreateUser(newUser, file, adminID)
    }

    @UseGuards(AdminGuard)
    @Get('get_admin_profile')
    GetAdminProfile(@Req() request: Request): Promise<Partial<UserEntity>>
    {
        return this.adminService.GetAdminProfile(request['user'].sub.userId)
    }

    @UseGuards(AdminGuard)
    @Get("/get_all_users")
    GetAllUsers(): Promise<UserEntity[]| { message: string }> {
        return this.adminService.GetAllUsers();
    }

    @UseGuards(AdminGuard)
    @Get("/get_user_by_email/:email")
    GetUserByEmail(@Param('email') email: string): Promise<UserEntity[] | {message:string}> {
        return this.adminService.GetUserByEmail(email);
    }

    @UseGuards(AdminGuard)
    @Get("/get_users_by_role_status")
    GetUsersByRoleStatus(@Query('role') role: Role, @Query('status') status: Status): Promise<UserEntity[] | null> {
        return this.adminService.GetUsersByRoleStatus(role, status);
    }

    @UseGuards(AdminGuard)
    @Patch("/update_user_status")
    UpdateUserStatus(@Body('id') id: string, @Body('status') status: Status, @Req() request: Request): Promise<ActivityEntity> {
        const adminID = request['user'].sub.profileId;
        return this.adminService.UpdateUserStatus(id, status, adminID);
    }

    @UseGuards(AdminGuard)
    @Put("/update_admin_profile")
    UpdateAdminProfile(@Body() updatedInfo: UpdateUserDTO, @Req() request: Request): Promise<Partial<UserEntity>> {
        const adminID = request['user'].sub.userId;
        return this.adminService.UpdateAdminProfile(updatedInfo, adminID);
    }

    @UseGuards(AdminGuard)
    @Delete("/delete_user/:id")
    DeleteUser(@Param('id') id: string, @Req() request: Request): Promise<ActivityEntity> {
        const adminID = request['user'].sub.profileId;
        return this.adminService.DeleteUser(id, adminID)
    }

    @UseGuards(AdminGuard)
    @Get('/get_all_activities')
    GetAllActivities(): Promise<ActivityEntity[]>
    {
        return this.adminService.GetAllActivities();
    }

    @UseGuards(AdminGuard)
    @Get("/get_all_transactions")
    GetAllTransactions(): Promise<TransactionEntity[]> {
        return this.adminService.GetAllTransactions();
    }

    @UseGuards(AdminGuard)
    @Patch("/update_transaction_status")
    UpdateTransactionStatus(@Body('id') id: string, @Body('status') status: TransactionStatus, @Req() request: Request): Promise<ActivityEntity> {
        const adminID = request['user'].sub.profileId;
        return this.adminService.UpdateTransactionStatus(id, status, adminID);
    }

    // @Post("create_transaction")
    // CreateTransaction(@Body() newTransaction: any): Promise<any> {
    //     return this.adminService.CreateTransaction(newTransaction);
    // }

}