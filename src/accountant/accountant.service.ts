import {Injectable} from '@nestjs/common';
import {randomUUID} from 'crypto';
import {CreateLedgerDto, UpdateLedgerDto} from './accountant.dto';

@Injectable()
export class AccountantService {

  getAccountant(): object {
    return {
      name: 'accountant',
      email: 'accountant@company.com',
    };
  }

  getAllLedgers(): Array<object> {
    return [
      {
        id:randomUUID(),
        title:'Office Rent',
        amount:20000,
        type:'expense',
        date:'2026-02-01',
        status:'approved',
      },
      {
        id:randomUUID(),
        title:'Client Payment',
        amount:50000,
        type:'income',
        date:'2026-02-10',
        status:'pending',
      },
    ];
  }

  getLedgerById(id: string): object {
    return {
      id,
      title:'Office Rent',
      amount:20000,
      type:'expense',
      date:'2026-02-01',
      status:'approved',
    };
  }

  createLedger(dto: CreateLedgerDto): object {
    return {
      message:'Ledger Created Successfully',
      data: {
        id: randomUUID(),
        title: dto.title,
        amount: dto.amount,
        type: dto.type,
        date: dto.date,
        status: dto.status ?? 'pending',
      },
    };
  }

  updateLedger(dto: UpdateLedgerDto): object {
    return {
      message:'Ledger Updated Successfully (PUT)',
      data: dto,
    };
  }

  updateLedgerStatus(id: string, status: string): object {
    return {
      message:'Ledger Status Updated (PATCH)',
      data: {
        id,
        status,
      },
    };
  }

  deleteLedger(id: string): object {
    return {
      message:'Ledger Deleted Successfully',
      data: {
        id,
        status:'deleted',
      },
    };
  }

  getReport(type: string, date: string): object {
    return {
      message:'Report Generated',
      filter:{type, date},
      summary:{
        totalTransactions: 5,
        totalAmount: 150000,
      },
    };
  }
}
