import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Task } from '../entity/task.entity';
import { User } from '../entity/user.entity';
import { Payment } from '../entity/payment.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  productName!: string;

  @Column()
  quantity!: number;

  @Column()
  price!: number;

  @Column()
  totalAmount!: number;

  //  task
  @ManyToOne(() => Task)
  task!: Task;

  // employee
  @ManyToOne(() => User, (user) => user.orders)
  employee!: User;

  //  supplier
  @ManyToOne(() => User)
  supplier!: User;

  // one-to-one payment
  @OneToOne(() => Payment, (payment) => payment.order)
  payment!: Payment;
}