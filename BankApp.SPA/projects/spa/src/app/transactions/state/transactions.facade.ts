import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { NewTransaction } from 'projects/api-client/src/models/transactions/new-transaction.model';
import { PaginationParameters } from '../../shared/models/pagination-parameters.model';
import { SortParameters } from '../../shared/models/sort-parameters.model';
import { TransactionsListFilters } from '../../shared/models/transactions-list-filters.model';
import { TransactionsActions } from './transactions.actions';
import {
  getFilters,
  getNewTransactionId,
  getPaginationParams,
  getQueryParams,
  getTransactions,
  isTableLoading
} from './transactions.selectors';
import { TransactionsState } from './transactions.state';

@Injectable({
  providedIn: 'root',
})
export class TransactionsFacade {
  newTransactionId$ = this.store.select(getNewTransactionId);
  transactions$ = this.store.select(getTransactions);
  filters$ = this.store.select(getFilters);
  paginationParams$ = this.store.select(getPaginationParams);
  queryParams$ = this.store.select(getQueryParams);
  isTableLoading$ = this.store.select(isTableLoading);

  constructor(private store: Store<TransactionsState>) {}

  createTransaction(transaction: NewTransaction): void {
    this.store.dispatch(TransactionsActions.createTransaction({ transaction }));
  }

  downloadNewConfirmation(): void {
    this.store.dispatch(TransactionsActions.downloadNewConfirmation());
  }

  downloadConfirmation(transactionId: number): void {
    this.store.dispatch(TransactionsActions.downloadConfirmation({ transactionId }));
  }

  fetchTransactions(): void {
    this.store.dispatch(TransactionsActions.fetchTransactions());
  }

  setFilters(filters: Partial<TransactionsListFilters>): void {
    this.store.dispatch(TransactionsActions.setFilters({ filters }));
    this.fetchTransactions();
  }

  setTableParams(pagination: Partial<PaginationParameters>, sort: SortParameters): void {
    this.store.dispatch(TransactionsActions.setTableParams({ pagination, sort }));
  }
}
