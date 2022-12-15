export interface NewTransactionState {
  selectedAccountId: number | null;
  recipientAccountNumber: string;
  recipientName: string;
  amount: number;
}
