import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityEntity } from 'src/admin/entities/activity.enitity';
import { ProfileEntity } from 'src/admin/entities/profile.entity';
import { UserEntity } from 'src/admin/entities/user.entity';
import { AccountantController } from './accountant.controller';
import { AccountantService } from './accountant.service';
import { AccountantEntity } from './entities/accountant.entity';
import { LedgerEntity } from './entities/ledger.entity';
import { TransactionEntity, type TransactionStatus } from "../admin/entities/transaction.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountantEntity,
      TransactionEntity,
      LedgerEntity,
      UserEntity,
      ProfileEntity,
      ActivityEntity,
    ]),
  ],
  controllers: [AccountantController],
  providers: [AccountantService],
})
export class AccountantModule {}
