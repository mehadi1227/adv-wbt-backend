import { Injectable } from "@nestjs/common";
import { randomUUID, UUID } from "crypto";
import { EmployeDto } from "./admin.dto";


@Injectable()
export class AdminService {

    getAdmin(): object {
        return {
            name: "admin",
            email: "admin@admin.com"
        }
    }

    getEmployes(): Array<object> {
        return [
            {
                id: randomUUID(),
                name: "employe 1",
                email: "employe1@company.com",
                role: "manager",
                status: "active"
            },
            {
                id: randomUUID(),
                name: "employe 2",
                email: "employe2@company.com",
                role: "employee",
                status: "active"
            },
            {
                id: randomUUID(),
                name: "employe 3",
                email: "employe3@company.com",
                role: "accountant",
                status: "active"
            },
            {
                id: randomUUID(),
                name: "employe 4",
                email: "employe4@company.com",
                role: "employee",
                status: "active"
            },
        ]
    }

    getEmployeById(name: string): object {
        return {
            id: randomUUID(),
            name: name,
            email: `${name}@company.com`,
            role: "accountant",
            status: "active"
        }
    }

    getEmployesByRole(role: string): Array<object> {
        return [
            {
                id: randomUUID(),
                name: "employe 1",
                email: "employe1@company.com",
                role: role,
                status: "active"
            },
            {
                id: randomUUID(),
                name: "employe 2",
                email: "employe2@company.com",
                role: role,
                status: "active"
            },
            {
                id: randomUUID(),
                name: "employe 3",
                email: "employe3@company.com",
                role: role,
                status: "active"
            },
            {
                id: randomUUID(),
                name: "employe 4",
                email: "employe4@company.com",
                role: role,
                status: "active"
            },
        ]
    }

    createEmployee(employeInfo: EmployeDto): object {
        return {
            id: randomUUID(),
            name: employeInfo.name,
            email: employeInfo.email,
            role: employeInfo.role,
            status: "active"
        }
    }

    updateEmployeeInfo(employeInfo: EmployeDto):object{
        return {
            id: employeInfo.id,
            name: employeInfo.name,
            email: employeInfo.email,
            role: employeInfo.role,
            status: employeInfo.status
        }
    }

    updateEmployeeStatus(id: string, status: string): object {

        return {
            id: id,
            name: "employe 3",
            email: "employe3@company.com",
            role: "accountant",
            status: status
        }
    }

    deleteEmployee(id: string): object{
        
        return {
            id: id,
            name: "deleted employe",
            email: "deletedEmploye@company.com",
            role: "employee",
            status: "deleted"
        }
    }

    getInvoiceByEmployeIdAndDate(id: string,date: string):object{

        return {
            id: randomUUID(),
            employeeId: id,
            date: date,
            transationAmount: 1000000
        }
    }
}