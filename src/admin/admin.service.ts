import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateUserDTO, UpdateUserDTO, UserDTO } from "src/admin/user.dto";
import { UserEntity } from "src/admin/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, MoreThanOrEqual, Repository } from "typeorm";
import type { Role, Status } from "src/admin/entities/user.entity";
import * as bycrypt from "bcrypt"
import { TransactionEntity, type TransactionStatus } from "./entities/transaction.entity";
import { ActivityEntity } from "./entities/activity.enitity";
import { ProfileEntity } from "./entities/profile.entity";



@Injectable()
export class AdminService {

    constructor(@InjectRepository(UserEntity) private adminRepository: Repository<UserEntity>,
        @InjectRepository(TransactionEntity) private transactionRepository: Repository<TransactionEntity>,
        @InjectRepository(ActivityEntity) private readonly activityRepository: Repository<ActivityEntity>,
        @InjectRepository(ProfileEntity) private readonly profileRepository: Repository<ProfileEntity>
    ) { }


    async CreateUser(userInfo: CreateUserDTO, files: Express.Multer.File, adminID: string): Promise<ActivityEntity> {

        const existingUser = await this.adminRepository.findOneBy({ email: userInfo.email });
        if (existingUser) {
            throw new BadRequestException("Email already exists");
        }

        const profile = this.profileRepository.create({
            full_name: userInfo.full_name,
            cv_path: files.destination + files.filename
        })
        await this.profileRepository.save(profile)

        const user = this.adminRepository.create({
            email: userInfo.email,
            password: userInfo.password,
            role: userInfo.role,
            profile: profile
        })

        await this.adminRepository.save(user)

        const adminProfile = await this.profileRepository.findOne({ where: {  id: adminID  } });
        if (!adminProfile) {
            throw new NotFoundException("Admin profile not found");
        }

        const newActivity = this.activityRepository.create({
            activity_title: `New ${userInfo.role} Created`,
            activity_description: `Admin created a new ${userInfo.role} with email ${userInfo.email}`,
            conducted_by: adminProfile
        })
        await this.activityRepository.save(newActivity)

        return newActivity
    }

    async GetAdminProfile(adminID: string): Promise<Partial<UserEntity>>
    {
        const admin = await this.adminRepository.findOne({where:{id: adminID}, select:{id: true,email:true, role:true, status:true, profile:true},
        relations: {profile: true}})
        if(!admin)
        {
            throw new UnauthorizedException("This is not valid admin")
        }
        return admin
    }

    async GetAllUsers(): Promise<UserEntity[] | { message: string }> {

        const users = await this.adminRepository.find({
            select: { id: true, email: true, role: true, status: true },
            relations: { profile: true }
        });
        if (users.length === 0) {
            return { message: "No users found" };
        }

        const filteredUsers = users.filter(users => users.role !== "admin");

        return filteredUsers;
    }

    async GetUserByEmail(email: string): Promise<UserEntity[] | { message: string }> {
        const desiredUsers = await this.adminRepository.find({
            where: { email: Like(`%${email}%`) },
            select: { id: true, email: true, role: true, status: true },
            relations: { profile: true }
        });

        if (desiredUsers.length === 0) {
            return { message: "No user found" };
        }

        return desiredUsers;
    }

    async UpdateUserStatus(id: string, status: Status, adminID: string): Promise<ActivityEntity> {

        await this.adminRepository.update(id, { status: status })
        const user = await this.adminRepository.findOne({ where: { id: id }, 
            select: { id: true, email: true, status: true, profile: { full_name: true } },
        relations: {profile: true} });
        if (!user) {
            throw new NotFoundException("User not found");
        }

        const adminProfile = await this.profileRepository.findOne({ where: {  id: adminID  } });
        if (!adminProfile) {
            throw new NotFoundException("Admin profile not found");
        }

        const newActivity = this.activityRepository.create({
            activity_title: `${user.profile.full_name}(${user.email}) status updated`,
            activity_description: `Admin updated ${user.profile.full_name}'s (${user.email}) status to ${status}`,
            conducted_by: adminProfile
        })
        await this.activityRepository.save(newActivity)

        return newActivity
        // return user;
    }

    async UpdateAdminProfile(updatedInfo: UpdateUserDTO, adminID: string): Promise<Partial<UserEntity>> {

        const salt = await bycrypt.genSalt();
        const hashedPassword = await bycrypt.hash(updatedInfo.password, salt);

        const user = await this.adminRepository.findOne({ where: { id: adminID }, relations: { profile: true } });
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
        const newActivity = this.activityRepository.create({
            activity_title: `admin profile updated`,
            activity_description: `Admin updated his profile`,
            conducted_by: user.profile
        })
        await this.activityRepository.save(newActivity)

        const { password, ...updatedUser } = user;
        return updatedUser;
    }

    async GetUsersByRoleStatus(role: Role, status: Status): Promise<UserEntity[] | null> {

        return await this.adminRepository.find({ where: { role: role, status: status } })
    }

    async DeleteUser(id: string, adminID: string): Promise<ActivityEntity> {
        const user = await this.adminRepository.findOne({where:{ id: id }, relations: { profile: true } });
        if (!user) {
            throw new NotFoundException("User not found");
        }
        const fullName = user.profile.full_name
        const email = user.email
        await this.adminRepository.delete(id);
        

        const adminProfile = await this.profileRepository.findOne({ where: {  id: adminID  } });
        if (!adminProfile) {
            throw new NotFoundException("Admin profile not found");
        }

        const newActivity = this.activityRepository.create({
            activity_title: `${fullName}(${email}) deleted`,
            activity_description: `Admin deleted ${fullName}'s (${email}) account`,
            conducted_by: adminProfile
        })

        await this.activityRepository.save(newActivity)
        
        return newActivity;
    }

    async GetAllActivities(): Promise<ActivityEntity[]> {
        return await this.activityRepository.find({ select:{conducted_by:{id: true, full_name: true, cv_path: true,
            address: true, 
            designation: true, 
            user: { email: true, role: true, status: true } } },
            relations: { conducted_by: { user: true } } });
    }

    async GetAllTransactions(): Promise<TransactionEntity[]> {
        return await this.transactionRepository.find({
            select: { transaction_to: {full_name:true, user: { email: true } }, issued_by: { full_name:true, user: { email: true } } },
            relations: {
                transaction_to: { user: true },
                issued_by: { user: true },
            }
            })
    }

    async UpdateTransactionStatus(id: string, status: TransactionStatus, adminID: string): Promise<ActivityEntity>
    {
        const transaction = await this.transactionRepository.findOne({
            where: { id: id },
            relations: { transaction_to: { user: true }, issued_by: { user: true } }
        });
        if (!transaction) {
            throw new NotFoundException("Transaction not found");
        }
        transaction.status = status;
        await this.transactionRepository.save(transaction);

        const adminProfile = await this.profileRepository.findOne({ where: {  id: adminID  } });
        if (!adminProfile) {
            throw new NotFoundException("Admin profile not found");
        }

        const newActivity = this.activityRepository.create({
            activity_title: `(${transaction.transaction_no}) Status updated to ${status}`,
            activity_description: `Admin updated status of transaction ${transaction.transaction_no} to ${status}, 
            that was issued by ${transaction.issued_by.full_name}(${transaction.issued_by.user.email}) to ${transaction.transaction_to.full_name}(${transaction.transaction_to.user.email})`,
            conducted_by: adminProfile
        })

        await this.activityRepository.save(newActivity)
        
        return newActivity;
    }

    // async CreateTransaction(newTransaction: any): Promise<TransactionEntity> {

    //     const transactionToUser = await this.profileRepository.findOneBy({
    //         id: newTransaction.transaction_to,
    //     })
    //     if (!transactionToUser) {
    //         throw new NotFoundException("Transaction To User not found");
    //     }
    //     const issuedByUser = await this.profileRepository.findOneBy({
    //         id: newTransaction.issued_by,
    //     })
    //     if (!issuedByUser) {
    //         throw new NotFoundException("Issued By User not found");
    //     }

    //     const transaction = this.transactionRepository.create({
    //         transaction_to: transactionToUser,
    //         issued_by: issuedByUser,
    //         order_id: newTransaction.order_id,
    //         type: newTransaction.type,
    //         amount: newTransaction.amount,
    //         payment_method: newTransaction.payment_method,
    //         transaction_date: newTransaction.transaction_date,
    //         description: newTransaction.description,
    //     });

    //     return await this.transactionRepository.save(transaction);
    // }
}