import { PagedResponse } from '../shared/paged-response.model';
import { Result } from '../shared/result.model';
import { Transaction } from './transaction.model';

export type TransactionsResponse = Result<PagedResponse<Transaction>>;
