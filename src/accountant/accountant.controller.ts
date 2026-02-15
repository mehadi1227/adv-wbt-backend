import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { AccountantService } from './accountant.service';
import { CreateLedgerDto, UpdateLedgerDto } from './accountant.dto';

@Controller('accountant')
export class AccountantController {
  constructor(private readonly accountantService: AccountantService) {}

  @Get()
  getAccountant(): object {
    return this.accountantService.getAccountant();
  }

  @Get('ledgers')
  getAllLedgers(): Array<object> {
    return this.accountantService.getAllLedgers();
  }

  @Get('ledgers/:id')
  getLedgerById(@Param('id') id: string): object {
    return this.accountantService.getLedgerById(id);
  }

  @Post('createLedger')
  createLedger(@Body() dto: CreateLedgerDto): object {
    return this.accountantService.createLedger(dto);
  }

  @Put('updateLedger')
  updateLedger(@Body() dto: UpdateLedgerDto): object {
    return this.accountantService.updateLedger(dto);
  }

  @Patch('updateLedgerStatus')
  updateLedgerStatus(
    @Body('id') id: string,
    @Body('status') status: string,
  ): object {
    return this.accountantService.updateLedgerStatus(id, status);
  }

  @Delete('deleteLedger')
  deleteLedger(@Body('id') id: string): object {
    return this.accountantService.deleteLedger(id);
  }

  @Get('report')
  getReport(@Query('type') type: string, @Query('date') date: string): object {
    return this.accountantService.getReport(type, date);
  }
}
