import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../../global-stores/auth/auth.actions';
import { TransactionType } from '../../shared/constants/enums/transaction-type.enum';
import { TransactionsConstants } from '../../shared/constants/transactions.constants';
import { TransactionsActions } from './transactions.actions';
import { TransactionsState } from './transactions.state';

const initialState: TransactionsState = {
  newTransactionId: null,
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

export const transactionsReducer = createReducer<TransactionsState>(
  initialState,
  on(TransactionsActions.createTransactionSuccess, (state, action): TransactionsState => ({
    ...state,
    newTransactionId: action.transactionId,
  })),
  on(TransactionsActions.fetchTransactions, (state): TransactionsState => ({
    ...state,
    isTableLoading: true,
  })),
  on(TransactionsActions.fetchTransactionsSuccess, (state, action): TransactionsState => ({
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
  on(TransactionsActions.clearTransactions, (state): TransactionsState => ({
    ...state,
    transactions: [],
    isTableLoading: false,
  })),
  on(TransactionsActions.setFilters, (state, action): TransactionsState => ({
    ...state,
    filters: {
      ...state.filters,
      ...action.filters,
    },
  })),
  on(TransactionsActions.setTableParams, (state, action): TransactionsState => ({
    ...state,
    paginationParameters: {
      ...state.paginationParameters,
      ...action.pagination,
    },
    sortParameters: action.sort,
  })),
  on(AuthActions.logout, (state): TransactionsState => ({
    ...state,
    ...initialState,
  }))
);
