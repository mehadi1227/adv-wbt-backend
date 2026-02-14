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
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateExpenseDto } from './employee.dto';
import { UpdateExpenseDto } from './employee.dto';
import { CreateInvoiceDto } from './employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('expenses')
  createExpense(@Body() object: CreateExpenseDto) {
    return this.employeeService.createExpense(object);
  }

  @Get('expenses')
  getAllExpenses() {
    return this.employeeService.getAllExpenses();
  }

  @Get('expenses/:id')
  getExpenseById(@Param('id') id: string) {
    return this.employeeService.getExpenseById(id);
  }

  @Put('expenses/:id')
  updateExpense(
    @Param('id') id: string,
    @Body() dto: UpdateExpenseDto,
  ) {
    return this.employeeService.updateExpense(id, dto);
  }

  @Patch('expenses/:id')
  patchExpense(
    @Param('id') id: string,
    @Body() dto: UpdateExpenseDto,
  ) {
    return this.employeeService.patchExpense(id, dto);
  }

  @Delete('expenses/:id')
  deleteExpense(@Param('id') id: string) {
    return this.employeeService.deleteExpense(id);
  }

  @Post('invoices')
  createInvoice(@Body() dto: CreateInvoiceDto) {
    return this.employeeService.createInvoice(dto);
  }

//   @Get('invoices')
//   getInvoices(@Query('status') status: string) {
//     return this.employeeService.getInvoices(status);
//   }
}