export class CreateLedgerDto {
  id: string;
  title: string;       
  amount: number;
  type: string;        
  date: string;       
  status: string;      
}

export class UpdateLedgerDto {
  id: string;
  title?: string;
  amount?: number;
  type?: string;
  date?: string;
  status?: string;
}
