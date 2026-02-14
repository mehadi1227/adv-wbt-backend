import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './employee.dto';
import { UpdateExpenseDto } from './employee.dto';
import { CreateInvoiceDto } from './employee.dto';

@Injectable()
export class EmployeeService {

  createExpense(myobject: CreateExpenseDto) {
    return {
      message: "Expense Created Successfully",myobject
     
    };
  }

  getAllExpenses() {
    return {
      message: 'All Expenses Fetched'
    };
  }

  getExpenseById(id: string) {
    return {
      message: `Expense ID: ${id}`
    };
  }

  updateExpense(id: string, dto: UpdateExpenseDto) {
    return {
      message: `Expense ${id} Updated`,
      data: dto
    };
  }

  patchExpense(id: string, dto: UpdateExpenseDto) {
    return {
      message: `Expense ${id} Partially Updated`,
      data: dto
    };
  }

  deleteExpense(id: string) {
    return {
      message: `Expense ${id} Deleted`
    };
  }

  createInvoice(dto: CreateInvoiceDto) {
    return {
      message: 'Invoice Draft Created',
      data: dto
    };
  }

//   getInvoices(status?: string) {
//     return {
//       message: 'Invoices Fetched',
//       filter: status || 'No Filter'
//     };
//   }
}