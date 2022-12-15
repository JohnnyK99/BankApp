import { createReducer } from '@ngrx/store';
import { NewTransactionState } from './new-transaction.state';

const initialState: NewTransactionState = {
  selectedAccountId: null,
  recipientAccountNumber: '',
  recipientName: '',
  amount: 0,
};

export const newTransactionReducer = createReducer<NewTransactionState>(
  initialState
);
