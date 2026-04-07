import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AccountantService } from './accountant.service';
import { CreateAccountantDto } from './dto/create-accountant.dto';
import { CreateLedgerDto } from './dto/create-ledger.dto';
import { ExpenseQueryDto } from './dto/expense-query.dto';
import { ProcessTransactionDto } from './dto/process-transaction.dto';
import { UpdateAccountantProfileDto } from './dto/update-accountant-profile.dto';
import { UpdateLedgerDto } from './dto/update-ledger.dto';

@Controller('accountant')
export class AccountantController {
  constructor(private readonly accountantService: AccountantService) {}

  @Post('profile')
  createAccountant(@Body() dto: CreateAccountantDto) {
    return this.accountantService.createAccountant(dto);
  }

  @Get('profile/:id')
  getAccountantProfile(@Param('id') id: string) {
    return this.accountantService.getAccountantProfile(id);
  }

  @Patch('profile/:id')
  updateAccountantProfile(
    @Param('id') id: string,
    @Body() dto: UpdateAccountantProfileDto,
  ) {
    return this.accountantService.updateAccountantProfile(id, dto);
  }

  @Get('transactions')
  getAllTransactions() {
    return this.accountantService.getAllTransactions();
  }

  @Get('expenses/total')
  getTotalExpenses(@Query() queryDto: ExpenseQueryDto) {
    return this.accountantService.getTotalExpenses(queryDto);
  }

  @Post('ledgers')
  createLedgerEntry(@Body() dto: CreateLedgerDto) {
    return this.accountantService.createLedgerEntry(dto);
  }

  @Get('ledgers')
  getAllLedgerEntries() {
    return this.accountantService.getAllLedgerEntries();
  }

  @Get('ledgers/:id')
  getLedgerEntryById(@Param('id') id: string) {
    return this.accountantService.getLedgerEntryById(id);
  }

  @Patch('ledgers/:id')
  updateLedgerEntry(@Param('id') id: string, @Body() dto: UpdateLedgerDto) {
    return this.accountantService.updateLedgerEntry(id, dto);
  }

   @Post("create_transaction")
     createTransaction(@Body() newTransaction: any): Promise<any> {
        return this.accountantService.createTransaction(newTransaction);
    }
}