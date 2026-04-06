import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
// import { CreateExpenseDto, CreateUserDto, RegisterationDto } from './employee.dto';
// import { UpdateExpenseDto } from './employee.dto';
// import { CreateInvoiceDto } from './employee.dto';
// import { EmployeeEntity } from './employee.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from 'node_modules/@nestjs-modules/mailer/dist/mailer.service';
//import { Employee, Order, Task } from './employee.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Payment } from './entity/payment.entity';
import { User } from './entity/user.entity';
import { Order } from './entity/order.entity';
//import { Employee } from './employee.entity';
import { Task} from './entity/task.entity';
import { CreateUserDto } from './employee.dto';
@Injectable()
export class EmployeeService {


constructor(
 // @InjectRepository(Employee) private empRepo: Repository<Employee>,
  @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Task) private taskRepo: Repository<Task>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
    private mailer: MailerService,
  ) {}

  // TASK
  async getAllTasks() {
    return this.taskRepo.find({ relations: ['assignedTo', 'createdBy'] });
  }

  async getTask(id: number) {
    const task = await this.taskRepo.findOne({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async updateTask(id: number, data: any) {
    await this.taskRepo.update(id, data);
    return this.getTask(id);
  }

  // ORDER
async createOrder(dto: any) {
  // find task
  const task = await this.taskRepo.findOne({
    where: { id: dto.taskId },
    relations: ['assignedTo'],
  });

  if (!task) throw new NotFoundException('Task not found');

  //  find supplier from DB
  const supplier = await this.userRepo.findOneBy({
    id: dto.supplierId,
  });

  if (!supplier) {
    throw new NotFoundException('Supplier not found');
  }

  //  create order
  const order = this.orderRepo.create({
    productName: dto.productName,
    quantity: dto.quantity,
    price: dto.price,
    totalAmount: dto.quantity * dto.price,

    task: task,
    employee: { id: dto.employeeId }, // 🔥 relation mapping
    supplier: { id: dto.supplierId },
  });

  const saved = await this.orderRepo.save(order);

  //  send mail (from DB email)
  await this.mailer.sendMail({
    to: supplier.email,
    subject: 'New Order',
    text: `New order: ${dto.productName}, Quantity: ${dto.quantity}`,
  });

  return saved;
}

  async getAllOrders() {
    return this.orderRepo.find({ relations: ['task', 'employee'] });
  }

  async updateOrder(id: number, data: any) {
    await this.orderRepo.update(id, data);
    return this.orderRepo.findOneBy({ id });
  }

  async deleteOrder(id: number) {
    return this.orderRepo.delete(id);
  }

  // RELATION
  async getTasksByEmployee(id: number) {
    return this.taskRepo.find({
      where: { assignedTo: { id } },
      relations: ['assignedTo'],
    });
  }

  async getOrdersByTask(taskId: number) {
    return this.orderRepo.find({
      where: { task: { id: taskId } },
      relations: ['task'],
    });
  }
async createPayment(dto: any) {
  const order = await this.orderRepo.findOne({
    where: { id: dto.orderId },
  });

  if (!order) {
    throw new NotFoundException('Order not found');
  }

  const payment = this.paymentRepo.create({
    amount: dto.amount,
    status: 'paid',
    order: order,
  });

  return this.paymentRepo.save(payment);
}

  async getPaymentByOrder(orderId: number) {
    return this.paymentRepo.findOne({
      where: { order: { id: orderId } },
      relations: ['order'],
    });
  }




//testing

 async createUser(dto: CreateUserDto) {
    const existing = await this.userRepo.findOneBy({
      email: dto.email,
    });

    if (existing) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.userRepo.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      role: dto.role,
    });

    return this.userRepo.save(user);
  }

    async assignTask(body: any) {
    const task = this.taskRepo.create({
      title: body.title,
      status: 'pending',

      assignedTo: { id: body.employeeId }, // employee
      createdBy: { id: body.managerId },   // manager
    });

    return this.taskRepo.save(task);
  }

//  constructor(
//   @InjectRepository(Employee)
//   private empRepo: Repository<Employee>,

//   @InjectRepository(Order)
//   private orderRepo: Repository<Order>,

//   @InjectRepository(Task)
//   private taskRepo: Repository<Task>,
  
// private jwtService: JwtService,
//   private mailer: MailerService,
//  ) {}

//  // CREATE (BCrypt + Mail)
// async create(dto) {
//     const existing = await this.empRepo.findOne({
//       where: { email: dto.email },
//     });

//     if (existing) {
//       throw new BadRequestException('Email already exists');
//     }

//     dto.password = await bcrypt.hash(dto.password, 10);

//     const user = this.empRepo.create(dto);
//     return await this.empRepo.save(user);
//   }


//  // GET
//  getAll() {
//   return this.empRepo.find({ relations: ['orders', 'task'] });
//  }

//  // GET BY ID
//  async getById(id: number) {
//   const user = await this.empRepo.findOne({ where: { id } });
//   if (!user) throw new NotFoundException("User not found");
//   return user;
//  }

//  // UPDATE
//  async updateProfile(id: number, dto) {
//   await this.empRepo.update(id, dto);
//   return this.getById(id);
//  }

//  // DELETE
//  async deleteUser(id: number) {
//   await this.empRepo.delete(id);
//   return { message: "Deleted" };
//  }

//  // RELATION CRUD (Order)

//  // CREATE ORDER
// async placeOrder(id: number, data) {

//   const emp = await this.empRepo.findOneBy({ id });

//   if (!emp) {
//     throw new NotFoundException("Employee not found");
//   }

//   // order create
//   const order = this.orderRepo.create({
//     ...data,
//     status: 'pending',
//     employee: emp,
//   });

//   const savedOrder = await this.orderRepo.save(order);

//   // ✅ MAIL SEND HERE
//   await this.mailer.sendMail({
//     to: emp.email,
//     subject: "Order Placed",
//     text: `Hello ${emp.name}, your order for ${data.product} has been placed successfully.`,
//   });

//   return savedOrder;
// }

//  // UPDATE ORDER
//  async updateOrder(id: number, data) {
//   await this.orderRepo.update(id, data);
//   return this.orderRepo.findOneBy({ id });
//  }

//  // DELETE ORDER
//  async deleteOrder(id: number) {
//   await this.orderRepo.delete(id);
//   return { message: "Order Deleted" };
//  }

//  // TASK
//  async viewTask(id: number) {
//   const emp = await this.taskRepo.findOne({
//    where: { id },
//    relations: ['task'],
//   });
//   if (!emp) throw new NotFoundException("Employee not found");
//   return emp.task;
//  }

//  // SALARY
//  salary(id: number) {
//   return { id, salary: 50000 };
//  }

  async findOne(username: string): Promise<User | null> {
    return this.userRepo.findOneBy({ email: username });
    
  }





  
  // registerEmployee(data: RegisterationDto): object {
  //   throw new Error('Method not implemented.');
  // }


// constructor(@InjectRepository(EmployeeEntity) private employeeRepository: Repository<EmployeeEntity>) {}
//  createUser(data: CreateUserDto): Promise<EmployeeEntity> {
//     const user = this.employeeRepository.create(data);
//     return this.employeeRepository.save(user);
//   }

//   // 2 Modify country
//   async updateCountry(id: number, country: string): Promise<EmployeeEntity | null> {
//     await this.employeeRepository.update(id, { country });
//     return this.employeeRepository.findOneBy({ id });
//   }

//   // 3 Get users by joining date
//   getUserByDate(joiningDate: string): Promise<EmployeeEntity[]> {
//     return this.employeeRepository.find({
//       where: { joiningDate: joiningDate as any }
//     });
//   }

//   // 4 Get users with default country
//   getUnknownCountryUsers(): Promise<EmployeeEntity[]> {
//     return this.employeeRepository.find({
//       where: { country: 'Unknown' }
//     });
//   } 


// // registerEmployee(data: RegisterationDto): object
// //    {
// //     // return {
// //     //   message: "Employee Registered Successfully",
// //     //   employee: data
// //     // };
// // return this.employeeRepository.save(data);
// //   }




//   createExpense(myobject: CreateExpenseDto) {
//     return {
//       message: "Expense Created Successfully",myobject
     
//     };
//   }

//   getAllExpenses():object {
//     return {
//       message: "All Expenses viewed"
//     };
//   }

//   getExpenseById(id: string):object {
//     return {id:id};
//   }

//   updateExpense(id: string, dto: UpdateExpenseDto):object {
//     return {
//       id: id,
//       UpdatedInfo: dto
//     };
//   }

//   patchExpense(id: string, dto: UpdateExpenseDto):object {
//     return {
//       message: `Expense ${id} Partially Updated`,
//       data: dto
//     };
//   }

//   deleteExpense(id: string):object {
//     return {
//       message: `Expense ${id} Deleted`
//     };
//   }

//   createInvoice(dto: CreateInvoiceDto):object {
//     return {
//       message: 'Invoice Draft Created',
//       data: dto
//     };
//   }
//     getInvoiceByNameAndID(name: string, id: number): object {
//     return { name: name, id: id };
//   }

//   // getInvoices(status?: string):object {
//   //   return {
//   //     message: 'Invoices Viewed',status
      
//   //   };
//   // }


 }