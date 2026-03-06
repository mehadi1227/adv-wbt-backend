import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

type status = "active" | "inactive"
type role = "manager" | "employee" | "accountant" | "supplier"

@Entity("Users")
export class UserEntity{
    @PrimaryGeneratedColumn("increment", {type: "int"})
    id: number

    @Column("varchar", {length: 100})
    fullName: string

    @Column("int")
    age: number

    @Column("varchar", {length: 255, unique: true})
    email: string

    @Column({default: "active"})
    status: status

    @Column()
    role: role

}