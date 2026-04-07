// import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
// import { Employee } from "./employee.entity";

// @Entity()
// export class Task {

//  @PrimaryGeneratedColumn()
//  id!: number;

//  @Column()
//  title!: string;

//  @Column({ default: 'assigned' })
//  status!: string;

//  @OneToOne(() => Employee, emp => emp.task)
//   @JoinColumn()
//  employee!: Employee;
//   task: any;

// }