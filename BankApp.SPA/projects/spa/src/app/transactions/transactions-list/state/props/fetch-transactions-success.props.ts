import { PagedResponse } from 'projects/api-client/src/models/shared/paged-response.model';
import { Transaction } from 'projects/api-client/src/models/transactions/transaction.model';

export interface FetchTransactionsSuccessProps {
  transactions: PagedResponse<Transaction>;
}
