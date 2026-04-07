import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../entity/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ default: 'pending' })
  status!: string;

  // employee
  @ManyToOne(() => User, (user) => user.tasks)
  assignedTo!: User;

  // manager
  @ManyToOne(() => User, (user) => user.createdTasks)
  createdBy!: User;
}