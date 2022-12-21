import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TransactionsQueryParams } from 'projects/api-client/src/models/transactions/transactions-query-params.model';
import { FeatureState } from '../../../shared/constants/enums/feature-state.enum';
import { DateHelpers } from '../../../shared/helpers/date-helpers';
import { TransactionsListState } from './transactions-list.state';

const getTransactionsListState = createFeatureSelector<TransactionsListState>(FeatureState.TransactionsList);

export const getTransactions = createSelector(
  getTransactionsListState,
  state => state.transactions
);

export const isTableLoading = createSelector(
  getTransactionsListState,
  state => state.isTableLoading
);

export const getPaginationParams = createSelector(
  getTransactionsListState,
  state => state.paginationParameters
);

export const getFilters = createSelector(
  getTransactionsListState,
  state => state.filters
);

export const getQueryParams = createSelector(
  getTransactionsListState,
  state => ({
    bankAccountNumber: state.filters.bankAccountNumber,
    transactionTypes: state.filters.transactionTypes,
    dateFrom: state.filters.dateFrom ? DateHelpers.format(state.filters.dateFrom) : null,
    dateTo: state.filters.dateTo ? DateHelpers.format(state.filters.dateTo) : null,
    searchBy: state.filters.searchBy,
    pageNumber: state.paginationParameters.currentPage,
    pageSize: state.paginationParameters.pageSize,
    sortColumn: state.sortParameters.column,
    sortDirection: state.sortParameters.sortDirection,
  } as TransactionsQueryParams)
);
