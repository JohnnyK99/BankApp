import { createReducer, on } from '@ngrx/store';
import { NewTransactionActions } from './new-transaction.actions';
import { NewTransactionState } from './new-transaction.state';

const initialState: NewTransactionState = {
  newTransactionId: null,
};

export const newTransactionReducer = createReducer<NewTransactionState>(
  initialState,
  on(NewTransactionActions.createTransactionSuccess, (state, action): NewTransactionState => ({
    ...state,
    newTransactionId: action.transactionId,
  }))
);
