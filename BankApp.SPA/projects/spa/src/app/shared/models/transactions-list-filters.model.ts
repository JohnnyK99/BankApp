import { TransactionType } from '../constants/enums/transaction-type.enum';

export interface TransactionsListFilters {
  bankAccountNumber: string | null;
  transactionTypes: TransactionType[];
  dateFrom: Date | null;
  dateTo: Date | null;
  searchBy: string;
}
