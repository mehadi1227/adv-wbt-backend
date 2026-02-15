export class CreateExpenseDto {
  amount: number;
  description: string;
}
export class CreateInvoiceDto {
  clientName: string;
  amount: number;
}
export class UpdateExpenseDto {
  amount?: number;
  description?: string;
}