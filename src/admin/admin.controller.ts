import { FileInterceptor } from "@nestjs/platform-express";

import { AdminService } from "./admin.service";
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UploadedFile, UploadedFiles, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { diskStorage } from "multer";
import { UserEntity } from "./admin.entity";
import type { status } from "./admin.dto";
import { UserDTO } from "./admin.dto";

@Controller('admin')
export class AdminController{

    constructor(private readonly adminService: AdminService){}

    // @Get() //for test
    // getAdmin(): object{
    //     return this.adminService.getAdmin();
    // }

    // @Get('employes')
    // getEmployes(): Array<object>{
    //     return this.adminService.getEmployes()
    // }

    // @Get('employes/:name')
    // getEmployeById(@Param('name') name: string): object{
    //     return this.adminService.getEmployeById(name)
    // }

    // @Get('employes/:role')
    // getEmployesByRole(@Param('role') role: string): Array<object>{
    //     return this.adminService.getEmployesByRole(role)
    // }

    // @UsePipes(new ValidationPipe())
    // @Post('createEmploye')
    // @UseInterceptors(FileInterceptor('NID-Card',{
    //     fileFilter: (req, file, callback)=>{
    //         if(file.originalname.match(/^.*\.(jpg|jpeg|png)$/))
    //         {
    //             callback(null, true)
    //         }else
    //         {
    //             callback(new Error("only jpg, jpeg, png files are allowed"), false)
    //         }
    //     },
    //     limits: {fileSize: 2*1024*1024},
    //     storage: diskStorage({
    //         destination: './uploads',
    //         filename: (req, file, callback)=>{
    //             const fileRename = 'NID-CARD-' + Date.now() + '-' + file.originalname
    //             callback(null, fileRename)
    //         }
    //     })
    // }))
    // createEmplye(@Body() employeInfo: EmployeDto, @UploadedFile() files: Express.Multer.File): object{
    //     return this.adminService.createEmployee(employeInfo, files)
    // }

    // @Put('updateEmploye/')
    // updateEmployeeInfo(@Body() employeInfo: EmployeDto): object{

    //     return this.adminService.updateEmployeeInfo(employeInfo)
    // }

    // @Patch('updateEmploye/')
    // updateEmployeeStatus(@Body('id') id: string, @Body('status') status: string): object{

    //     return this.adminService.updateEmployeeStatus(id, status)
    // }

    // @Delete("deleteEmploye/")
    // deleteEmployee(@Body('id') id: string): object{
    //     return this.adminService.deleteEmployee(id)
    // }

    // @Get('invoice/')
    // getInvoiceByEmployeIdAndDate(@Query('id') id: string, @Query('date') date: string): object{
    //     return this.adminService.getInvoiceByEmployeIdAndDate(id,date)
    // }

    @Post("/createuser")
    @UsePipes(new ValidationPipe())
    CreateUser( @Body() userInfo: UserDTO): Promise<UserEntity>{
        return this.adminService.CreateUser(userInfo)
    }

    @Patch("/updatestatus/:id")
    UpdateUserStatus(@Param('id') id: number, @Body('status') status: status): Promise<UserEntity| null>
    {
        return this.adminService.UpdateUserStatus(id, status)
    }

    @Get("/getinactiveusers")
    GetInactiveUsers(): Promise<UserEntity[] | null>
    {
        return this.adminService.GetInactiveUsers()
    }

    @Get("/getolderusers")
    GetOlderUsers(): Promise<UserEntity[] | null>
    {
        return this.adminService.GetOlderUsers()
    }

}