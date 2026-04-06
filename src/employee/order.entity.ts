// import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import { Employee } from "./employee.entity";

// @Entity()
// export class Order {

//  @PrimaryGeneratedColumn()
//  id!: number;

//  @Column()
//  product!: string;

//  @Column({ default: 'pending' })
//  status!: string;

//  @ManyToOne(() => Employee, emp => emp.orders)
//   @JoinColumn()
//  employee!: Employee;

// }