import { EmployeDto } from "./admin.dto";
import { AdminService } from "./admin.service";
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from "@nestjs/common";

@Controller('admin')
export class AdminController{

    constructor(private readonly adminService: AdminService){}

    @Get() //for test
    getAdmin(): object{
        return this.adminService.getAdmin();
    }

    @Get('employes')
    getEmployes(): Array<object>{
        return this.adminService.getEmployes()
    }

    @Get('employes/:name')
    getEmployeById(@Param('name') name: string): object{
        return this.adminService.getEmployeById(name)
    }

    @Get('employes/:role')
    getEmployesByRole(@Param('role') role: string): Array<object>{
        return this.adminService.getEmployesByRole(role)
    }

    @Post('createEmploye')
    createEmplye(@Body() employeInfo: EmployeDto): object{
        return this.adminService.createEmployee(employeInfo)
    }

    @Put('updateEmploye/')
    updateEmployeeInfo(@Body() employeInfo: EmployeDto): object{

        return this.adminService.updateEmployeeInfo(employeInfo)
    }

    @Patch('updateEmploye/')
    updateEmployeeStatus(@Body('id') id: string, @Body('status') status: string): object{

        return this.adminService.updateEmployeeStatus(id, status)
    }

    @Delete("deleteEmploye/")
    deleteEmployee(@Body('id') id: string): object{
        return this.adminService.deleteEmployee(id)
    }

    @Get('invoice/')
    getInvoiceByEmployeIdAndDate(@Query('id') id: string, @Query('date') date: string): object{
        return this.adminService.getInvoiceByEmployeIdAndDate(id,date)
    }

}