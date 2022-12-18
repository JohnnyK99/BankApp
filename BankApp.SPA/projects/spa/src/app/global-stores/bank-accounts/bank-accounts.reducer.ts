import { createReducer, on } from '@ngrx/store';
import { BankAccountsActions } from './bank-accounts.actions';
import { BankAccountsState } from './bank-accounts.state';

const initialState: BankAccountsState = {
  bankAccounts: null,
};

export const bankAccountsReducer = createReducer<BankAccountsState>(
  initialState,
  on(BankAccountsActions.fetchUserBankAccountsSuccess, (state, action) => ({
    ...state,
    bankAccounts: action.bankAccounts,
  }))
);
