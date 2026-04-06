import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ManagerService } from './manager.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ProfileDetailsDto } from '../dto/profile_details.dto';
import { ManageEmployeeDto } from '../dto/create-employee.dto';
import { AssignTaskDto } from '../dto/assign-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { SalaryDto } from '../dto/salary.dto';

@Controller('manager')
@UseGuards(JwtAuthGuard)
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Get('profile')
  getProfile() {
    return this.managerService.getProfile();
  }

  @Put('profile')
  updateProfile(@Body() dto: ProfileDetailsDto) {
    return this.managerService.updateProfile(dto);
  }

  @Get('employees')
  viewAllEmployees() {
    return this.managerService.viewAllEmployees();
  }

  @Post('employee')
  createEmployee(@Body() dto: ManageEmployeeDto) {
    return this.managerService.createEmployee(dto);
  }

  @Get('employee/search')
  searchEmployees(@Query('name') name: string) {
    return this.managerService.searchEmployees(name);
  }

  @Get('employee/:username')
  findEmployee(@Param('username') username: string) {
    return this.managerService.findEmployeeByUsername(username);
  }

  @Delete('employee/:username')
  deleteEmployee(@Param('username') username: string) {
    return this.managerService.removeEmployeeByUsername(username);
  }

  @Post('employee/:username/task')
  assignTask(@Param('username') username: string, @Body() dto: AssignTaskDto) {
    return this.managerService.assignTask(username, dto);
  }

  @Patch('task/:taskId')
  updateTask(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.managerService.updateTask(taskId, dto);
  }

  @Get('employee/:username/activity')
  viewEmployeeActivity(@Param('username') username: string) {
    return this.managerService.viewEmployeeActivity(username);
  }

  @Patch('employee/:username/salary/increment')
  incrementSalary(@Param('username') username: string, @Body() dto: SalaryDto) {
    return this.managerService.incrementSalary(username, dto);
  }

  @Patch('employee/:username/salary/deduct')
  deductSalary(@Param('username') username: string, @Body() dto: SalaryDto) {
    return this.managerService.deductSalary(username, dto);
  }

  @Patch('employee/:username/bonus')
  addBonus(@Param('username') username: string, @Body() dto: SalaryDto) {
    return this.managerService.addBonus(username, dto);
  }
}
