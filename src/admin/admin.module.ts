import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/admin/entities/user.entity";
import { TransactionEntity } from "./entities/transaction.entity";
import { AuthModule } from "src/admin/auth/auth.module";
import { AdminGuard } from "./admin.guard";
import { ActivityEntity } from "./entities/activity.enitity";
import { ProfileEntity } from "./entities/profile.entity";
// import { UserEntity } from "./admin.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, TransactionEntity, ActivityEntity,ProfileEntity]), AuthModule],
    controllers: [AdminController],
    providers: [AdminService, AdminGuard]
})

export class AdminModule{}