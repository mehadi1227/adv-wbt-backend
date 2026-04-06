import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ProfileDetailsDto } from '../dto/profile_details.dto';
import { ManageEmployeeDto } from '../dto/create-employee.dto';
import { AssignTaskDto } from '../dto/assign-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { SalaryDto } from '../dto/salary.dto';
import { Employee } from '../entity/employee.entity';
import { Task } from '../entity/task.entity';
import { Manager } from '../entity/manager.entity';
const MANAGER_ID = 1;

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,

    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>,
  ) {}

  async getProfile() {
    const manager = await this.managerRepository.findOne({
      where: { id: MANAGER_ID },
    });

    if (!manager) {
      return { message: 'No profile found. Please update your profile first.' };
    }
    const { password, ...safeData } = manager;
    return { message: 'Manager profile', data: safeData };
  }

  async updateProfile(dto: ProfileDetailsDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    let manager = await this.managerRepository.findOne({
      where: { id: MANAGER_ID },
    });

    if (!manager) {
      manager = this.managerRepository.create({
        name: dto.name,
        password: hashedPassword,
        birthDate: dto.birthDate,
        socialLink: dto.socialLink,
      });
    } else {
      manager.name = dto.name;
      manager.password = hashedPassword;
      manager.birthDate = dto.birthDate;
      manager.socialLink = dto.socialLink;
    }

    const saved = await this.managerRepository.save(manager);
    const { password, ...safeData } = saved;

    return { message: 'Profile updated successfully', data: safeData };
  }

  async createEmployee(dto: ManageEmployeeDto) {
    // Check if username already taken
    const existing = await this.employeeRepository.findOne({
      where: { username: dto.username },
    });

    if (existing) {
      throw new BadRequestException(
        `Employee with username "${dto.username}" already exists`,
      );
    }

    const employee = this.employeeRepository.create({
      username: dto.username,
      fullName: dto.fullName,
    });

    const saved = await this.employeeRepository.save(employee);

    return {
      message: `Employee "${saved.fullName}" created with ID: ${saved.id}`,
      data: saved,
    };
  }

  async viewAllEmployees() {
    const employees = await this.employeeRepository.find({
      relations: ['tasks'],
    });

    return {
      message: 'All employees',
      total: employees.length,
      data: employees,
    };
  }

  async searchEmployees(name: string) {
    if (!name) {
      throw new BadRequestException('Please provide a name to search');
    }

    const employees = await this.employeeRepository.find({
      where: {
        fullName: Like(`%${name}%`),
      },
    });

    return {
      message: `Search results for "${name}"`,
      total: employees.length,
      data: employees,
    };
  }

  async findEmployeeByUsername(username: string) {
    const employee = await this.employeeRepository.findOne({
      where: { username },
      relations: ['tasks'],
    });

    if (!employee) {
      throw new NotFoundException(`Employee "${username}" not found`);
    }

    return { message: 'Employee found', data: employee };
  }

  async removeEmployeeByUsername(username: string) {
    const employee = await this.employeeRepository.findOne({
      where: { username },
    });

    if (!employee) {
      throw new NotFoundException(`Employee "${username}" not found`);
    }

    await this.employeeRepository.remove(employee);

    return { message: `Employee "${username}" has been deleted` };
  }

  async assignTask(username: string, dto: AssignTaskDto) {
    const employee = await this.employeeRepository.findOne({
      where: { username },
    });

    if (!employee) {
      throw new NotFoundException(`Employee "${username}" not found`);
    }

    const manager = await this.managerRepository.findOne({
      where: { id: MANAGER_ID },
    });

    if (!manager) {
      throw new NotFoundException(
        'Manager profile not found. Please update your profile first.',
      );
    }

    const task = this.taskRepository.create({
      title: dto.title,
      description: dto.description,
      deadline: dto.deadline,
      employee: employee,
      manager: manager,
    });

    const saved = await this.taskRepository.save(task);

    return {
      message: `Task "${saved.title}" assigned to ${employee.fullName}`,
      data: {
        ...saved,
        manager: {
          id: manager.id,
          name: manager.name,
        },
        employee: {
          id: employee.id,
          username: employee.username,
          fullName: employee.fullName,
        },
      },
    };
  }

  async updateTask(taskId: number, dto: UpdateTaskDto) {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: ['employee'],
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    if (dto.title) task.title = dto.title;
    if (dto.description) task.description = dto.description;
    if (dto.status) task.status = dto.status;
    if (dto.deadline) task.deadline = dto.deadline;

    const updated = await this.taskRepository.save(task);

    return {
      message: 'Task updated successfully',
      data: {
        ...updated,
        employee: {
          id: updated.employee.id,
          username: updated.employee.username,
          fullName: updated.employee.fullName,
        },
      },
    };
  }

  async viewEmployeeActivity(username: string) {
    const employee = await this.employeeRepository.findOne({
      where: { username },
      relations: ['tasks'],
    });

    if (!employee) {
      throw new NotFoundException(`Employee "${username}" not found`);
    }

    const total = employee.tasks.length;
    const completed = employee.tasks.filter(
      (t) => t.status === 'completed',
    ).length;
    const inProgress = employee.tasks.filter(
      (t) => t.status === 'in-progress',
    ).length;
    const pending = employee.tasks.filter((t) => t.status === 'pending').length;

    return {
      message: `Activity report for ${employee.fullName}`,
      data: {
        employee: {
          id: employee.id,
          username: employee.username,
          fullName: employee.fullName,
          isActive: employee.isActive,
          salary: employee.salary,
          bonus: employee.bonus,
        },
        taskSummary: { total, completed, inProgress, pending },
        tasks: employee.tasks,
      },
    };
  }

  async incrementSalary(username: string, dto: SalaryDto) {
    const employee = await this.employeeRepository.findOne({
      where: { username },
    });

    if (!employee) {
      throw new NotFoundException(`Employee "${username}" not found`);
    }

    employee.salary = Number(employee.salary) + dto.amount;
    const updated = await this.employeeRepository.save(employee);

    return {
      message: `Salary incremented by ${dto.amount} for ${employee.fullName}`,
      data: { username: updated.username, newSalary: updated.salary },
    };
  }

  async deductSalary(username: string, dto: SalaryDto) {
    const employee = await this.employeeRepository.findOne({
      where: { username },
    });

    if (!employee) {
      throw new NotFoundException(`Employee "${username}" not found`);
    }

    if (Number(employee.salary) < dto.amount) {
      throw new BadRequestException(
        `Cannot deduct ${dto.amount}. Current salary is only ${employee.salary}`,
      );
    }

    employee.salary = Number(employee.salary) - dto.amount;
    const updated = await this.employeeRepository.save(employee);

    return {
      message: `Salary deducted by ${dto.amount} for ${employee.fullName}`,
      data: { username: updated.username, newSalary: updated.salary },
    };
  }

  async addBonus(username: string, dto: SalaryDto) {
    const employee = await this.employeeRepository.findOne({
      where: { username },
    });

    if (!employee) {
      throw new NotFoundException(`Employee "${username}" not found`);
    }

    employee.bonus = Number(employee.bonus) + dto.amount;
    const updated = await this.employeeRepository.save(employee);

    return {
      message: `Bonus of ${dto.amount} added to ${employee.fullName}`,
      data: { username: updated.username, totalBonus: updated.bonus },
    };
  }
}
