import { Injectable } from "@nestjs/common";
import { UserDTO } from "src/user.dto";
import { UserEntity } from "src/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { MoreThanOrEqual, Repository } from "typeorm";
import type { Role, Status } from "src/user.entity";
import * as bycrypt from "bcrypt"
import { TransactionEntity } from "src/transaction.entity";



@Injectable()
export class AdminService {
    // UpdateUserStatus(id: number, status: string): Promise<UserEntity | null> {
    //     throw new Error("Method not implemented.");
    // }
    // GetInactiveUsers(): Promise<UserEntity[] | null> {
    //     throw new Error("Method not implemented.");
    // }
    // GetOlderUsers(): Promise<UserEntity[] | null> {
    //     throw new Error("Method not implemented.");
    // }

    constructor(@InjectRepository(UserEntity) private adminRepository: Repository<UserEntity>,
        @InjectRepository(TransactionEntity) private transactionRepository: Repository<TransactionEntity>
    ) { }


    async CreateUser(userInfo: UserDTO, files: Express.Multer.File): Promise<UserEntity> {

        const user = this.adminRepository.create({
            name: userInfo.name,
            email: userInfo.email,
            password: userInfo.password,
            role: userInfo.role,
            cv_path: files.destination + files.filename
        })

        await this.adminRepository.save(user)
        return user
    }

    async GetAllUsers(): Promise<UserEntity[] | null> {
        return this.adminRepository.find();
    }

    async GetUserById(email: string): Promise<UserEntity | null> {
        return this.adminRepository.findOneBy({ email: email });
    }

    async UpdateUserStatus(id: string, status: Status): Promise<UserEntity | null> {

        await this.adminRepository.update(id, { status: status })
        const user = await this.adminRepository.findOneBy({ id: id });
        if (!user) {
            return null;
        }
        return user;
    }

    async UpdateAdminProfile(updatedInfo: UserDTO): Promise<UserEntity | null> {

        const salt = await bycrypt.genSalt();
        const hashedPassword = await bycrypt.hash(updatedInfo.password, salt);

        await this.adminRepository.update(updatedInfo.id, {
            name: updatedInfo.name,
            email: updatedInfo.email,
            password: hashedPassword
        })
        const user = await this.adminRepository.findOneBy({ id: updatedInfo.id });
        if (!user) {
            return null;
        }
        return user;
    }

    async GetUsersByRoleStatus(role: Role, status: Status): Promise<UserEntity[] | null> {

        return await this.adminRepository.find({ where: { role: role, status: status } })
    }

    async DeleteUser(id: string): Promise<{ message: string }> {
        const user = await this.adminRepository.findOneBy({ id: id });
        if (!user) {
            return { message: "User not found" };
        }
        await this.adminRepository.delete(id);
        return { message: "User deleted successfully" };
    }

    async CreateTransaction(newTransaction: TransactionEntity): Promise<TransactionEntity> {

        const transactionToUser = await this.adminRepository.findOneBy({
            id: newTransaction.transaction_to.id,
        })
        if (!transactionToUser) {
            throw new Error("Transaction To User not found");
        }
        const issuedByUser = await this.adminRepository.findOneBy({
            id: newTransaction.issued_by.id,
        })
        if (!issuedByUser) {
            throw new Error("Issued By User not found");
        }

        const transaction = this.transactionRepository.create({
            transaction_to: transactionToUser,
            issued_by: issuedByUser,
            order_id: newTransaction.order_id,
            type: newTransaction.type,
            amount: newTransaction.amount,
            payment_method: newTransaction.payment_method,
            transaction_date: newTransaction.transaction_date,
            description: newTransaction.description,
        });

        return await this.transactionRepository.save(transaction);
    }
}