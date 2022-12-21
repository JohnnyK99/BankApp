import { createAction, props } from '@ngrx/store';
import { CreateTransactionSuccessProps } from './props/create-transaction-success.props';
import { CreateTransactionProps } from './props/create-transaction.props';
import { DownloadConfirmationSuccessProps } from './props/download-confirmation-sucess.props';
import { DownloadConfirmationProps } from './props/download-confirmation.props';
import { FetchTransactionsSuccessProps } from './props/fetch-transactions-success.props';
import { SetFiltersProps } from './props/set-filters.props';
import { SetTableParamsProps } from './props/set-table-params.props';

export const TransactionsActions = {
  createTransaction: createAction(
    '[Transactions] Create transaction',
    props<CreateTransactionProps>()
  ),
  createTransactionSuccess: createAction(
    '[Transactions] Create transaction success',
    props<CreateTransactionSuccessProps>()
  ),
  createTransactionFail: createAction(
    '[Transactions] Create transaction fail'
  ),
  downloadConfirmation: createAction(
    '[Transactions] Download confirmation',
    props<DownloadConfirmationProps>()
  ),
  downloadNewConfirmation: createAction(
    '[Transactions] Download new confirmation'
  ),
  downloadConfirmationSuccess: createAction(
    '[Transactions] Download confirmation success',
    props<DownloadConfirmationSuccessProps>()
  ),
  downloadConfirmationFail: createAction(
    '[Transactions] Download confirmation fail'
  ),
  fetchTransactions: createAction(
    '[Transactions] Fetch transactions'
  ),
  fetchTransactionsSuccess: createAction(
    '[Transactions] Fetch transactions success',
    props<FetchTransactionsSuccessProps>()
  ),
  fetchTransactionsFail: createAction(
    '[Transactions] Fetch transactions fail'
  ),
  setFilters: createAction(
    '[Transactions] Set filters',
    props<SetFiltersProps>()
  ),
  setTableParams: createAction(
    '[Transactions] Set table params',
    props<SetTableParamsProps>()
  ),
};
