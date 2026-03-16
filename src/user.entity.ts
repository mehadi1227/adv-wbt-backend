
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
export type Role = "admin" | "employee" | "manager" | "accountant" | "supplier"
export type Status = "active" | "inactive" | "blocked" | "reset"
import * as bcrypt from "bcrypt"

@Entity("users")
export class UserEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("varchar",{ length: 255,nullable: false})
    name: string

    @Column("varchar",{length: 255, unique:true, nullable: false})
    email: string

    @Column("varchar", {length: 255, nullable: false})
    password: string

    @Column("varchar",{nullable: false})
    role: Role

    @Column({default: "active",nullable: false})
    status: Status

    @Column("varchar", {length: 255, nullable: true})
    cv_path: string

    @BeforeInsert()
     async hashPassword(){
        
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }
}