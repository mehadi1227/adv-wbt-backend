import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateExpenseDto, RegisterationDto } from './employee.dto';
import { UpdateExpenseDto } from './employee.dto';
import { CreateInvoiceDto } from './employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  
  @Post('registration')
  @UsePipes(new ValidationPipe())
  registerEmployee(@Body() data: RegisterationDto): object {
    return this.employeeService.registerEmployee(data);
  }

  @Post('create-expenses')
  createExpense(@Body() object: CreateExpenseDto) {
    return this.employeeService.createExpense(object);
  }

  @Get('expenses')
  getAllExpenses():object {
    return this.employeeService.getAllExpenses();
  }

  @Get('search-expenses/:id')
  getExpenseById(@Param('id') id: string):object {
    return this.employeeService.getExpenseById(id);
  }

  @Put('expenses-update/:id')
  updateExpense(
    @Param('id') id: string,
    @Body() dto: UpdateExpenseDto,
  ):object {
    return this.employeeService.updateExpense(id, dto);
  }

  @Patch('expenses-partial/:id')
  patchExpense(
    @Param('id') id: string,
    @Body() dto: UpdateExpenseDto,
  ):object {
    return this.employeeService.patchExpense(id, dto);
  }

  @Delete('delete-expenses/:id')
  deleteExpense(@Param('id') id: string):object {
    return this.employeeService.deleteExpense(id);
  }

  @Post('create-invoices')
  createInvoice(@Body() dto: CreateInvoiceDto):object {
    return this.employeeService.createInvoice(dto);
  }
  
    @Get('search')
  getInvoiceByNameAndID(
    @Query('name') name: string,
    @Query('id') id: number
  ): object {
    return this.employeeService.getInvoiceByNameAndID(name, id);
  }

  // @Get('invoices')
  // getInvoices(@Query('status') status: string): {
  //   return this.employeeService.getInvoices(status);
  // }
}