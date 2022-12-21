import { Transaction } from 'projects/api-client/src/models/transactions/transaction.model';
import { PaginationParameters } from '../../shared/models/pagination-parameters.model';
import { SortParameters } from '../../shared/models/sort-parameters.model';
import { TransactionsListFilters } from '../../shared/models/transactions-list-filters.model';

export interface TransactionsState {
  newTransactionId: number | null;
  transactions: Transaction[] | null;
  filters: TransactionsListFilters;
  paginationParameters: PaginationParameters;
  sortParameters: SortParameters;
  isTableLoading: boolean;
}
