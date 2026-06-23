import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from '../entity/task.entity';
import { Order } from '../entity/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column()
    phone!: string;

  @Column()
  role!: string; // manager | employee | supplier
    


  // employee  tasks
  @OneToMany(() => Task, (task) => task.assignedTo)
  tasks!: Task[];

  // manager created tasks
  @OneToMany(() => Task, (task) => task.createdBy)
  createdTasks!: Task[];

  // employee orders
  @OneToMany(() => Order, (order) => order.employee)
  orders!: Order[];
}