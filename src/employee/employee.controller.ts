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
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';

//import { JwtGuard } from './jwt.guard';

import { CreateEmployeeDto, CreateUserDto, UpdateProfileDto } from './employee.dto';
import { EmployeeService } from './employee.service';
import { AuthGuard } from 'src/auth/auth.guard';
// import { CreateExpenseDto, CreateUserDto, DateDto, RegisterationDto, UpdateCountryDto } from './employee.dto';
// import { UpdateExpenseDto } from './employee.dto';
// import { CreateInvoiceDto } from './employee.dto';

@Controller('employee')
export class EmployeeController {
  
 

 constructor(private readonly employeeService: EmployeeService) {}
  
 // ===== TASK =====
  @Get('tasks')
  getAllTasks() {
    return this.employeeService.getAllTasks();
  }

  @Get('tasks/:id')
  getTask(@Param('id', ParseIntPipe) id: number) {
    return this.employeeService.getTask(id);
  }

  @Patch('tasks/:id')
  updateTask(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.employeeService.updateTask(id, body);
  }

  // ===== ORDER =====
  @Post('orders')
  createOrder(@Body() body: any) {
    return this.employeeService.createOrder(body);
  }

  @Get('orders')
  getAllOrders() {
    return this.employeeService.getAllOrders();
  }

  @Put('orders/:id')
  updateOrder(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.employeeService.updateOrder(id, body);
  }

  @Delete('orders/:id')
  deleteOrder(@Param('id', ParseIntPipe) id: number) {
    return this.employeeService.deleteOrder(id);
  }

  // ===== RELATION =====

  @Get('tasks/employee/:id')
  getTasksByEmployee(@Param('id', ParseIntPipe) id: number) {
    return this.employeeService.getTasksByEmployee(id);
  }

  @Get('orders/task/:taskId')
  getOrdersByTask(@Param('taskId', ParseIntPipe) taskId: number) {
    return this.employeeService.getOrdersByTask(taskId);
  }

  @Post('payment')
createPayment(@Body() body: any) {
  return this.employeeService.createPayment(body);
}

  @Get('payment/order/:orderId')
  getPaymentByOrder(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.employeeService.getPaymentByOrder(orderId);
  }





//testing


 // CREATE USER
  @Post('create')
  @UsePipes(new ValidationPipe())
  createUser(@Body() body: CreateUserDto) {
    return this.employeeService.createUser(body);
  }
  // 🔥 simple assign task (for testing)
  @Post('assign')
  assignTask(@Body() body: any) {
    return this.employeeService.assignTask(body);
  }


















// // CREATE
//  @Post()
//  @UsePipes(new ValidationPipe())
//  create(@Body() dto: CreateEmployeeDto) {
//   return this.employeeService.create(dto);
//  }

//  // GET
//  @UseGuards(AuthGuard)
//  @Get()
//  getAll() {
//   return this.employeeService.getAll();
//  }

//  // GET BY ID
//  @Get(':id')
//  getById(@Param('id') id: number) {
//   return this.employeeService.getById(id);
//  }

//  // UPDATE
//  @Put(':id')
//  @UseGuards(JwtGuard)
//  update(@Param('id') id: number, @Body() dto: UpdateProfileDto) {
//   return this.employeeService.updateProfile(id, dto);
//  }

//  // PATCH
//  @Patch(':id')
//  patch(@Param('id') id: number, @Body() dto: UpdateProfileDto) {
//   return this.employeeService.updateProfile(id, dto);
//  }

//  // DELETE
//  @Delete(':id')
//  delete(@Param('id') id: number) {
//   return this.employeeService.deleteUser(id);
//  }

//  // RELATION ROUTES (3 required)

//  @Post('order/:id')
//  placeOrder(@Param('id') id: number, @Body() data) {
//   return this.employeeService.placeOrder(id, data);
//  }

//  @Put('order/:id')
//  updateOrder(@Param('id') id: number, @Body() data) {
//   return this.employeeService.updateOrder(id, data);
//  }

//  @Delete('order/:id')
//  deleteOrder(@Param('id') id: number) {
//   return this.employeeService.deleteOrder(id);
//  }

//  // TASK
//  @Get('task/:id')
//  task(@Param('id') id: number) {
//   return this.employeeService.viewTask(id);
//  }

//  // SALARY
//  @Get('salary/:id')
//  salary(@Param('id') id: number) {
//   return this.employeeService.salary(id);
//  }











  
//  @Post('create')
//   @UsePipes(new ValidationPipe())
//   createUser(@Body() dto: CreateUserDto) {
//     return this.employeeService.createUser(dto);
//   }

//   // 2 Update Country
//   @Put('update-country/:id')
//   @UsePipes(new ValidationPipe())
//   updateCountry(
//     @Param('id') id: number,
//     @Body() dto: UpdateCountryDto
//   ) {
//     return this.employeeService.updateCountry(id, dto.country);
//   }

//   // 3 Get user by joining date
//   @Get('by-date')
//   @UsePipes(new ValidationPipe())
//   getUserByDate(@Query() dateobj: DateDto) {
//     return this.employeeService.getUserByDate(dateobj.joiningDate);
//   }

//   // 4 Get users with default country
//   @Get('unknown-country')
//   getUnknownCountryUsers() {
//     return this.employeeService.getUnknownCountryUsers();
//   }



//   // @Post('registration')
//   // @UsePipes(new ValidationPipe())
//   // registerEmployee(@Body() data: RegisterationDto): object {
//   //   return this.employeeService.registerEmployee(data);
//   // }

//   @Post('create-expenses')
//   createExpense(@Body() object: CreateExpenseDto) {
//     return this.employeeService.createExpense(object);
//   }

//   @Get('expenses')
//   getAllExpenses():object {
//     return this.employeeService.getAllExpenses();
//   }

//   @Get('search-expenses/:id')
//   getExpenseById(@Param('id') id: string):object {
//     return this.employeeService.getExpenseById(id);
//   }

//   @Put('expenses-update/:id')
//   updateExpense(
//     @Param('id') id: string,
//     @Body() dto: UpdateExpenseDto,
//   ):object {
//     return this.employeeService.updateExpense(id, dto);
//   }

//   @Patch('expenses-partial/:id')
//   patchExpense(
//     @Param('id') id: string,
//     @Body() dto: UpdateExpenseDto,
//   ):object {
//     return this.employeeService.patchExpense(id, dto);
//   }

//   @Delete('delete-expenses/:id')
//   deleteExpense(@Param('id') id: string):object {
//     return this.employeeService.deleteExpense(id);
//   }

//   @Post('create-invoices')
//   createInvoice(@Body() dto: CreateInvoiceDto):object {
//     return this.employeeService.createInvoice(dto);
//   }
  
//     @Get('search')
//   getInvoiceByNameAndID(
//     @Query('name') name: string,
//     @Query('id') id: number
//   ): object {
//     return this.employeeService.getInvoiceByNameAndID(name, id);
//   }

//   // @Get('invoices')
//   // getInvoices(@Query('status') status: string): {
//   //   return this.employeeService.getInvoices(status);
//   // }
}