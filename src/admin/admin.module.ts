import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/user.entity";
import { TransactionEntity } from "src/transaction.entity";
import { AuthModule } from "src/auth/auth.module";
import { AdminGuard } from "./admin.guard";
// import { UserEntity } from "./admin.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, TransactionEntity]), AuthModule],
    controllers: [AdminController],
    providers: [AdminService, AdminGuard]
})

export class AdminModule{}