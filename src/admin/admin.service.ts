import { Injectable } from "@nestjs/common";
import { randomUUID, UUID } from "crypto";
import { UserEntity } from "./admin.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { MoreThanOrEqual, Repository } from "typeorm";
import { status } from "./admin.dto";


@Injectable()
export class AdminService {

    constructor(@InjectRepository(UserEntity) private adminRepository:Repository<UserEntity>){}
    
    // getAdmin(): object {
    //     return {
    //         name: "admin",
    //         email: "admin@admin.com"
    //     }
    // }

    // getEmployes(): Array<object> {
    //     return [
    //         {
    //             id: randomUUID(),
    //             name: "employe 1",
    //             email: "employe1@company.com",
    //             role: "manager",
    //             status: "active"
    //         },
    //         {
    //             id: randomUUID(),
    //             name: "employe 2",
    //             email: "employe2@company.com",
    //             role: "employee",
    //             status: "active"
    //         },
    //         {
    //             id: randomUUID(),
    //             name: "employe 3",
    //             email: "employe3@company.com",
    //             role: "accountant",
    //             status: "active"
    //         },
    //         {
    //             id: randomUUID(),
    //             name: "employe 4",
    //             email: "employe4@company.com",
    //             role: "employee",
    //             status: "active"
    //         },
    //     ]
    // }

    // getEmployeById(name: string): object {
    //     return {
    //         id: randomUUID(),
    //         name: name,
    //         email: `${name}@company.com`,
    //         role: "accountant",
    //         status: "active"
    //     }
    // }

    // getEmployesByRole(role: string): Array<object> {
    //     return [
    //         {
    //             id: randomUUID(),
    //             name: "employe 1",
    //             email: "employe1@company.com",
    //             role: role,
    //             status: "active"
    //         },
    //         {
    //             id: randomUUID(),
    //             name: "employe 2",
    //             email: "employe2@company.com",
    //             role: role,
    //             status: "active"
    //         },
    //         {
    //             id: randomUUID(),
    //             name: "employe 3",
    //             email: "employe3@company.com",
    //             role: role,
    //             status: "active"
    //         },
    //         {
    //             id: randomUUID(),
    //             name: "employe 4",
    //             email: "employe4@company.com",
    //             role: role,
    //             status: "active"
    //         },
    //     ]
    // }

    // createEmployee(employeInfo: EmployeDto, files: Express.Multer.File): object {
    //     // console.log(files);
        
    //     return {
    //         id: randomUUID(),
    //         name: employeInfo.name,
    //         email: employeInfo.email,
    //         NID: employeInfo.NID,
    //         role: employeInfo.role,
    //         status: "active",
    //         NIDCardImage: files.path
    //     }
    // }

    // updateEmployeeInfo(employeInfo: EmployeDto):object{
    //     return {
    //         id: employeInfo.id,
    //         name: employeInfo.name,
    //         email: employeInfo.email,
    //         role: employeInfo.role,
    //         status: employeInfo.status
    //     }
    // }

    // updateEmployeeStatus(id: string, status: string): object {

    //     return {
    //         id: id,
    //         name: "employe 3",
    //         email: "employe3@company.com",
    //         role: "accountant",
    //         status: status
    //     }
    // }

    // deleteEmployee(id: string): object{
        
    //     return {
    //         id: id,
    //         name: "deleted employe",
    //         email: "deletedEmploye@company.com",
    //         role: "employee",
    //         status: "deleted"
    //     }
    // }

    // getInvoiceByEmployeIdAndDate(id: string,date: string):object{

    //     return {
    //         id: randomUUID(),
    //         employeeId: id,
    //         date: date,
    //         transationAmount: 1000000
    //     }
    // }

    async CreateUser(userInfo: UserEntity): Promise<UserEntity>{
       const user = await this.adminRepository.save(userInfo)
        return user
    }

    async UpdateUserStatus(id: number, status: status): Promise<UserEntity | null>
    {
        await this.adminRepository.update(id, {status: status})

        return this.adminRepository.findOneBy({id: id})
    }

    async GetInactiveUsers(): Promise<UserEntity[] | null>
    {
        

        return this.adminRepository.find({where:{status: "inactive"}})
    }

    async GetOlderUsers(): Promise<UserEntity[] | null>
    {
        
        return this.adminRepository.find({where:{age: MoreThanOrEqual(40) }})
    }
}