import { createAction, props } from '@ngrx/store';
import { CreateTransactionSuccessProps } from './props/create-transaction-success.props';
import { CreateTransactionProps } from './props/create-transaction.props';
import { DownloadConfirmationSuccessProps } from './props/download-confirmation-sucess.props';

export const NewTransactionActions = {
  createTransaction: createAction(
    '[New transaction] Create transaction',
    props<CreateTransactionProps>()
  ),
  createTransactionSuccess: createAction(
    '[New transaction] Create transaction success',
    props<CreateTransactionSuccessProps>()
  ),
  createTransactionFail: createAction(
    '[New transaction] Create transaction fail'
  ),
  downloadConfirmation: createAction(
    '[New transaction] Download confirmation'
  ),
  downloadConfirmationSuccess: createAction(
    '[New transaction] Download confirmation success',
    props<DownloadConfirmationSuccessProps>()
  ),
  downloadConfirmationFail: createAction(
    '[New transaction] Download confirmation fail'
  ),
};
