import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/user.entity";
import { TransactionEntity } from "src/transaction.entity";
// import { UserEntity } from "./admin.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, TransactionEntity])],
    controllers: [AdminController],
    providers: [AdminService]
})

export class AdminModule{}