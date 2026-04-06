import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO, UpdateUserDTO, UserDTO } from "src/admin/user.dto";
import { UserEntity } from "src/admin/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, MoreThanOrEqual, Repository } from "typeorm";
import type { Role, Status } from "src/admin/entities/user.entity";
import * as bycrypt from "bcrypt"
import { TransactionEntity } from "./entities/transaction.entity";
import { ActivityEntity } from "./entities/activity.enitity";
import { ProfileEntity } from "./entities/profile.entity";



@Injectable()
export class AdminService {

    constructor(@InjectRepository(UserEntity) private adminRepository: Repository<UserEntity>,
        @InjectRepository(TransactionEntity) private transactionRepository: Repository<TransactionEntity>,
        @InjectRepository(ActivityEntity) private readonly activityRepository: Repository<ActivityEntity>,
        @InjectRepository(ProfileEntity) private readonly profileRepository: Repository<ProfileEntity>
    ) { }


    async CreateUser(userInfo: CreateUserDTO, files: Express.Multer.File): Promise<UserEntity> {

        const existingUser = await this.adminRepository.findOneBy({ email: userInfo.email });
        if (existingUser) {
            throw new BadRequestException("Email already exists");
        }

        const profile = this.profileRepository.create({
            full_name: userInfo.full_name,
            cv_path: files.destination + files.filename
        })
        
        const user = this.adminRepository.create({
            email: userInfo.email,
            password: userInfo.password,
            role: userInfo.role,
            profile: profile
        })

        await this.adminRepository.save(user)
        return user
    }

    async GetAllUsers(): Promise<UserEntity[] | { message: string }> {
        
        const users = await this.adminRepository.find({ select: { id: true, email: true, role: true, status: true },
                                                         relations: { profile: true } });
        if (users.length === 0) {
            return { message: "No users found" };
        }

        const filteredUsers = users.filter(users => users.role !== "admin");

        return filteredUsers;
    }

    async GetUserByEmail(email: string): Promise<UserEntity[] | {message:string}> {
        const desiredUsers = await this.adminRepository.find({ where: { email: Like(`%${email}%`) },
                                                               select: { id: true, email: true, role: true, status: true },
                                                               relations: { profile: true }});
        
        if (desiredUsers.length === 0) {
            return {message: "No user found"};
        }

         return desiredUsers;
    }

    async UpdateUserStatus(id: string, status: Status): Promise<UserEntity > {

        await this.adminRepository.update(id, { status: status })
        const user = await this.adminRepository.findOne({where:{id: id }, select: { id: true, email: true,status:true, profile:{full_name:true}}});
        if (!user) {
            throw new NotFoundException("User not found");
        }
        return user;
    }

    async UpdateAdminProfile(updatedInfo: UpdateUserDTO): Promise<Partial<UserEntity> > {

        const salt = await bycrypt.genSalt();
        const hashedPassword = await bycrypt.hash(updatedInfo.password, salt);

        const user = await this.adminRepository.findOne({ where: { id: updatedInfo.id }, relations: {profile: true} });
        if (!user) {
            throw new NotFoundException("User not found");
        }

        user.email = updatedInfo.email;
        user.password = hashedPassword;
        
        user.profile.full_name = updatedInfo.full_name;
        user.profile.address = updatedInfo.address;
        user.profile.designation = updatedInfo.designation;

        await this.adminRepository.save(user);
        
        // const updatedUser = await this.adminRepository.findOne({ where: { id: updatedInfo.id }, relations: {profile: true} });

        const {password, ...updatedUser} = user;
            return updatedUser;
    }

    async GetUsersByRoleStatus(role: Role, status: Status): Promise<UserEntity[] | null> {

        return await this.adminRepository.find({ where: { role: role, status: status } })
    }

    async DeleteUser(id: string): Promise<{ message: string }> {
        const user = await this.adminRepository.findOneBy({ id: id });
        if (!user) {
            throw new BadRequestException("User not found");
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