
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
export type Role = "admin" | "employee" | "manager" | "accountant" | "supplier"
export type Status = "active" | "inactive" | "blocked" | "reset"
import * as bcrypt from "bcrypt"
import { ProfileEntity } from "./profile.entity";


@Entity("users")
export class UserEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("varchar",{length: 255, unique:true, nullable: false})
    email: string

    @Column("varchar", {length: 255, nullable: false})
    password: string

    @Column("varchar",{nullable: false})
    role: Role

    @Column({default: "active",nullable: false})
    status: Status

    @OneToOne(() => ProfileEntity, profile => profile.user, { cascade: true })
    @JoinColumn()
    profile: ProfileEntity
    
    

    @BeforeInsert()
     async hashPassword(){
        
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }
}