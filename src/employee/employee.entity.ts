// import { BeforeInsert, Column,CreateDateColumn,Entity,Generated,JoinColumn,ManyToOne,OneToMany,OneToOne,PrimaryGeneratedColumn } from "typeorm";
// import { v4 as uuidv4 } from 'uuid';
// import { Order } from "./order.entity";
// import { Task } from "./task.entity";



// @Entity()
// export class Employee {

//  @PrimaryGeneratedColumn()
//  id!: number;

//  @Column()
//  name!: string;

//  @Column({ unique: true })
//  email!: string;

//  @Column()
//  password!: string;

//  @Column({ default: 'Unknown' })
//  country!: string;

//  // OneToMany
//  @OneToMany(() => Order, order => order.employee)
//  orders!: Order[];

//  // OneToOne (FIXED)
//  @OneToOne(() => Task, task => task.employee)

//  task!: Task;

// }

















// export { Order, Task };
// // @Entity()
// // export class EmployeeEntity {

// //   @PrimaryGeneratedColumn()
// //   id: number;

// //   @Column({ type: 'varchar', length: 150 })
// //   uniqueId: string;

// //   @BeforeInsert()
// //   generateUuid() {
// //     this.uniqueId = uuidv4();
// //   }

// //   @CreateDateColumn()
// //   joiningDate: Date;

// //   @Column({ type: 'varchar', length: 30, default: 'Unknown' })
// //   country: string;
// // }


