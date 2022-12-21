import { SortDirection } from 'projects/spa/src/app/shared/constants/enums/sort-direction.enum';
import { TransactionType } from 'projects/spa/src/app/shared/constants/enums/transaction-type.enum';

export interface TransactionsQueryParams {
  bankAccountNumber: string;
  transactionTypes: TransactionType[];
  dateFrom?: string | null;
  dateTo?: string | null;
  searchBy?: string;
  pageNumber: number;
  pageSize: number;
  sortColumn?: string;
  sortDirection: SortDirection;
}
