import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './task.entity';

@Entity('managers')
export class Manager {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'date',
  })
  birthDate: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  socialLink: string;

  @OneToMany(() => Task, (task) => task.manager)
  tasks: Task[];
}
