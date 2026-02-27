import { Injectable } from '@nestjs/common';
import { CreateExpenseDto, RegisterationDto } from './employee.dto';
import { UpdateExpenseDto } from './employee.dto';
import { CreateInvoiceDto } from './employee.dto';


@Injectable()
export class EmployeeService {


  registerEmployee(data: RegisterationDto): object {
    return {
      message: "Employee Registered Successfully",
      employee: data
    };

  }




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
    getInvoiceByNameAndID(name: string, id: number): object {
    return { name: name, id: id };
  }

  // getInvoices(status?: string):object {
  //   return {
  //     message: 'Invoices Viewed',status
      
  //   };
  // }


}