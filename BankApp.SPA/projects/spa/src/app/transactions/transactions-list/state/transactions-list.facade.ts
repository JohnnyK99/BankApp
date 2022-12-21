import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PaginationParameters } from '../../../shared/models/pagination-parameters.model';
import { SortParameters } from '../../../shared/models/sort-parameters.model';
import { TransactionsListFilters } from '../../../shared/models/transactions-list-filters.model';
import { TransactionsListActions } from './transactions-list.actions';
import {
  getFilters,
  getPaginationParams,
  getQueryParams,
  getTransactions,
  isTableLoading
} from './transactions-list.selectors';
import { TransactionsListState } from './transactions-list.state';

@Injectable({
  providedIn: 'root',
})
export class TransactionsListFacade {
  transactions$ = this.store.select(getTransactions);
  filters$ = this.store.select(getFilters);
  paginationParams$ = this.store.select(getPaginationParams);
  queryParams$ = this.store.select(getQueryParams);

  isTableLoading$ = this.store.select(isTableLoading);

  constructor(private store: Store<TransactionsListState>) {}

  fetchTransactions(): void {
    this.store.dispatch(TransactionsListActions.fetchTransactions());
  }

  setFilters(filters: Partial<TransactionsListFilters>): void {
    this.store.dispatch(TransactionsListActions.setFilters({ filters }));
    this.fetchTransactions();
  }

  setTableParams(pagination: Partial<PaginationParameters>, sort: SortParameters): void {
    this.store.dispatch(TransactionsListActions.setTableParams({ pagination, sort }));
    this.fetchTransactions();
  }
}
