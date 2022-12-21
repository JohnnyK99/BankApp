import { createReducer, on } from '@ngrx/store';
import { TransactionType } from '../../../shared/constants/enums/transaction-type.enum';
import { TransactionsConstants } from '../../../shared/constants/transactions.constants';
import { TransactionsListActions } from './transactions-list.actions';
import { TransactionsListState } from './transactions-list.state';

const initialState: TransactionsListState = {
  transactions: [],
  filters: {
    bankAccountNumber: null,
    dateFrom: null,
    dateTo: null,
    transactionTypes: [TransactionType.Incoming, TransactionType.Outcoming],
    searchBy: '',
  },
  paginationParameters: {
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    pageSize: TransactionsConstants.defaultPageSize,
  },
  sortParameters: {},
  isTableLoading: false,
};

export const transactionsListReducer = createReducer<TransactionsListState>(
  initialState,
  on(TransactionsListActions.fetchTransactions, (state): TransactionsListState => ({
    ...state,
    isTableLoading: true,
  })),
  on(TransactionsListActions.fetchTransactionsSuccess, (state, action): TransactionsListState => ({
    ...state,
    transactions: action.transactions.data,
    paginationParameters: {
      currentPage: action.transactions.pageNumber,
      totalPages: action.transactions.totalPages,
      totalRecords: action.transactions.totalRecords,
      pageSize: action.transactions.pageSize,
    },
    isTableLoading: false,
  })),
  on(TransactionsListActions.setFilters, (state, action): TransactionsListState => ({
    ...state,
    filters: {
      ...state.filters,
      ...action.filters,
    },
  })),
  on(TransactionsListActions.setTableParams, (state, action): TransactionsListState => ({
    ...state,
    paginationParameters: {
      ...state.paginationParameters,
      ...action.pagination,
    },
    sortParameters: action.sort,
  }))
);
