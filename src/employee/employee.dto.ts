export class CreateExpenseDto {
  amount: number;
  category: string;
  description: string;
}
export class CreateInvoiceDto {
  clientName: string;
  amount: number;
  description: string;
}
export class UpdateExpenseDto {
  amount?: number;
  category?: string;
  description?: string;
}