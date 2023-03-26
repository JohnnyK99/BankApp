import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TransactionsQueryParams } from 'projects/api-client/src/models/transactions/transactions-query-params.model';
import { DateFormat } from '../../shared/constants/enums/date-format.enum';
import { FeatureState } from '../../shared/constants/enums/feature-state.enum';
import { DateHelpers } from '../../shared/helpers/date-helpers';
import { TransactionsState } from './transactions.state';

const getTransactionsState = createFeatureSelector<TransactionsState>(FeatureState.Transactions);

export const getNewTransactionId = createSelector(
  getTransactionsState,
  state => state.newTransactionId
);

export const getTransactions = createSelector(
  getTransactionsState,
  state => state.transactions
);

export const isTableLoading = createSelector(
  getTransactionsState,
  state => state.isTableLoading
);

export const getPaginationParams = createSelector(
  getTransactionsState,
  state => state.paginationParameters
);

export const getFilters = createSelector(
  getTransactionsState,
  state => state.filters
);

export const getQueryParams = createSelector(
  getTransactionsState,
  state => ({
    bankAccountNumber: state.filters.bankAccountNumber,
    transactionTypes: state.filters.transactionTypes,
    dateFrom: state.filters.dateFrom ? DateHelpers.format(state.filters.dateFrom, DateFormat.Api) : null,
    dateTo: state.filters.dateTo ? DateHelpers.format(state.filters.dateTo, DateFormat.Api) : null,
    searchBy: state.filters.searchBy,
    pageNumber: state.paginationParameters.currentPage,
    pageSize: state.paginationParameters.pageSize,
    sortColumn: state.sortParameters.column,
    sortDirection: state.sortParameters.sortDirection,
  } as TransactionsQueryParams)
);
