import { createAction, props } from '@ngrx/store';
import { FetchTransactionsSuccessProps } from './props/fetch-transactions-success.props';
import { SetFiltersProps } from './props/set-filters.props';
import { SetTableParamsProps } from './props/set-table-params.props';

export const TransactionsListActions = {
  fetchTransactions: createAction(
    '[Transactions list] Fetch transactions'
  ),
  fetchTransactionsSuccess: createAction(
    '[Transactions list] Fetch transactions success',
    props<FetchTransactionsSuccessProps>()
  ),
  fetchTransactionsFail: createAction(
    '[Transactions list] Fetch transactions fail'
  ),
  setFilters: createAction(
    '[Transactions list] Set filters',
    props<SetFiltersProps>()
  ),
  setTableParams: createAction(
    '[Transactions list] Set table params',
    props<SetTableParamsProps>()
  ),
};
