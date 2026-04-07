import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountantDto } from './dto/create-accountant.dto';
import { CreateLedgerDto } from './dto/create-ledger.dto';
import { ExpenseQueryDto } from './dto/expense-query.dto';
import { UpdateAccountantProfileDto } from './dto/update-accountant-profile.dto';
import { UpdateLedgerDto } from './dto/update-ledger.dto';
import { AccountantEntity } from './entities/accountant.entity';
import { LedgerEntity } from './entities/ledger.entity';
import { ProfileEntity } from 'src/admin/entities/profile.entity';
import { ActivityEntity } from 'src/admin/entities/activity.enitity';
import { UserEntity } from 'src/admin/entities/user.entity';
import {
  TransactionEntity,
  type TransactionStatus,
  type TransactionType,
} from '../admin/entities/transaction.entity';

@Injectable()
export class AccountantService {
  constructor(
    @InjectRepository(UserEntity)
    private adminRepository: Repository<UserEntity>,

    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,

    @InjectRepository(ActivityEntity)
    private readonly activityRepository: Repository<ActivityEntity>,

    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,

    @InjectRepository(AccountantEntity)
    private readonly accountantRepo: Repository<AccountantEntity>,

    @InjectRepository(LedgerEntity)
    private readonly ledgerRepo: Repository<LedgerEntity>,
  ) {}

  async createAccountant(dto: CreateAccountantDto) {
    const existing = await this.accountantRepo.findOne({
      where: { email: dto.email },
    });

    if (existing) {
      throw new BadRequestException('An accountant with this email already exists.');
    }

    const accountant = this.accountantRepo.create({
      ...dto,
      isActive: dto.isActive ?? true,
    });

    const saved = await this.accountantRepo.save(accountant);

    return {
      message: 'Accountant profile created successfully.',
      data: saved,
    };
  }

  async getAccountantProfile(id: string) {
    const accountant = await this.accountantRepo.findOne({ where: { id } });

    if (!accountant) {
      throw new NotFoundException(`Accountant not found with id ${id}`);
    }

    return {
      message: 'Accountant profile fetched successfully.',
      data: accountant,
    };
  }

  async updateAccountantProfile(id: string, dto: UpdateAccountantProfileDto) {
    const accountant = await this.accountantRepo.findOne({ where: { id } });

    if (!accountant) {
      throw new NotFoundException(`Accountant not found with id ${id}`);
    }

    if (dto.email && dto.email !== accountant.email) {
      const existing = await this.accountantRepo.findOne({
        where: { email: dto.email },
      });

      if (existing) {
        throw new BadRequestException('Another accountant already uses this email.');
      }
    }

    Object.assign(accountant, dto);
    const updated = await this.accountantRepo.save(accountant);

    return {
      message: 'Accountant profile updated successfully.',
      data: updated,
    };
  }

  async getAllTransactions() {
    const transactions = await this.transactionRepository.find({
      relations: ['transaction_to', 'issued_by'],
      order: { updated_at: 'DESC' },
    });

    return {
      message: 'Transactions fetched successfully.',
      total: transactions.length,
      data: transactions,
    };
  }

  async getTotalExpenses(queryDto: ExpenseQueryDto) {
    const query = this.transactionRepository.createQueryBuilder('transaction');

    if (queryDto.from) {
      query.andWhere('DATE(transaction.transaction_date) >= :from', {
        from: queryDto.from,
      });
    }

    if (queryDto.to) {
      query.andWhere('DATE(transaction.transaction_date) <= :to', {
        to: queryDto.to,
      });
    }

    const result = await query
      .select('COALESCE(SUM(transaction.amount), 0)', 'totalExpenses')
      .getRawOne<{ totalExpenses: string }>();

    return {
      message: 'Total expenses calculated successfully.',
      filter: queryDto,
      data: {
        totalExpenses: Number(result?.totalExpenses ?? 0),
      },
    };
  }

  async createLedgerEntry(dto: CreateLedgerDto) {
    const accountant = await this.accountantRepo.findOne({
      where: { id: dto.accountantId },
    });

    if (!accountant) {
      throw new NotFoundException(`Accountant not found with id ${dto.accountantId}`);
    }

    const ledger = this.ledgerRepo.create({
      ...dto,
      accountantId: accountant.id,
    });

    const saved = await this.ledgerRepo.save(ledger);

    return {
      message: 'Ledger entry created successfully.',
      data: saved,
    };
  }

  async getAllLedgerEntries() {
    const ledgers = await this.ledgerRepo.find({
      order: { entryDate: 'DESC', createdAt: 'DESC' },
    });

    return {
      message: 'Ledger entries fetched successfully.',
      total: ledgers.length,
      data: ledgers,
    };
  }

  async getLedgerEntryById(id: string) {
    const ledger = await this.ledgerRepo.findOne({ where: { id } });

    if (!ledger) {
      throw new NotFoundException(`Ledger entry not found with id ${id}`);
    }

    return {
      message: 'Ledger entry fetched successfully.',
      data: ledger,
    };
  }

  async updateLedgerEntry(id: string, dto: UpdateLedgerDto) {
    const ledger = await this.ledgerRepo.findOne({ where: { id } });

    if (!ledger) {
      throw new NotFoundException(`Ledger entry not found with id ${id}`);
    }

    Object.assign(ledger, dto);
    const updated = await this.ledgerRepo.save(ledger);

    return {
      message: 'Ledger entry updated successfully.',
      data: updated,
    };
  }

  async createTransaction(newTransaction: {
  transaction_to: string;
  issued_by: string;
  order_id?: string;
  type: TransactionType;
  status?: TransactionStatus;
  amount: number;
  currency?: string;
  payment_method: string;
  transaction_date: string | Date;
  processed_by_id?: string;
  note?: string;
}): Promise<TransactionEntity> {
  const transactionToUser = await this.profileRepository.findOne({
    where: { id: newTransaction.transaction_to },
  });

  if (!transactionToUser) {
    throw new NotFoundException('Transaction receiver profile not found');
  }

  const issuedByUser = await this.profileRepository.findOne({
    where: { id: newTransaction.issued_by },
  });

  if (!issuedByUser) {
    throw new NotFoundException('Issued by profile not found');
  }

  if (!newTransaction.amount || Number(newTransaction.amount) <= 0) {
    throw new BadRequestException('Amount must be greater than 0');
  }

  const transaction = this.transactionRepository.create({
    transaction_to: transactionToUser,
    issued_by: issuedByUser,
    order_id: newTransaction.order_id ?? null,
    type: newTransaction.type,
    status: newTransaction.status ?? 'pending',
    amount: Number(newTransaction.amount),
    currency: newTransaction.currency ?? 'BDT',
    payment_method: newTransaction.payment_method,
    transaction_date: new Date(newTransaction.transaction_date),
    processed_by_id: newTransaction.processed_by_id ?? null,
    note: newTransaction.note ?? null,
  });

  return await this.transactionRepository.save(transaction);
}
}