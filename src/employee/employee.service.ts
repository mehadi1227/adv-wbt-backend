import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './employee.dto';
import { UpdateExpenseDto } from './employee.dto';
import { CreateInvoiceDto } from './employee.dto';
import { stat } from 'fs';

@Injectable()
export class EmployeeService {

  createExpense(myobject: CreateExpenseDto) {
    return {
      message: "Expense Created Successfully",myobject
     
    };
  }

  getAllExpenses():object {
    return {
      message: "All Expenses viewed"
    };
  }

  getExpenseById(id: string):object {
    return {id:id};
  }

  updateExpense(id: string, dto: UpdateExpenseDto):object {
    return {
      id: id,
      UpdatedInfo: dto
    };
  }

  patchExpense(id: string, dto: UpdateExpenseDto):object {
    return {
      message: `Expense ${id} Partially Updated`,
      data: dto
    };
  }

  deleteExpense(id: string):object {
    return {
      message: `Expense ${id} Deleted`
    };
  }

  createInvoice(dto: CreateInvoiceDto):object {
    return {
      message: 'Invoice Draft Created',
      data: dto
    };
  }

  getInvoices(status?: string):object {
    return {
      message: 'Invoices Viewed',status
      
    };
  }
}