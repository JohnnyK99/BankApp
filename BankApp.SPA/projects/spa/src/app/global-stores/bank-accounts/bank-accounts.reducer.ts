import { createReducer, on } from '@ngrx/store';
import { BankAccountsActions } from './bank-accounts.actions';
import { BankAccountsState } from './bank-accounts.state';

const initialState: BankAccountsState = {
  bankAccounts: null,
  selectedBankAccountIndex: null,
};

export const bankAccountsReducer = createReducer<BankAccountsState>(
  initialState,
  on(BankAccountsActions.fetchUserBankAccountsSuccess, (state, action): BankAccountsState => ({
    ...state,
    bankAccounts: action.bankAccounts,
    selectedBankAccountIndex: state.selectedBankAccountIndex ?? 0,
  })),
  on(BankAccountsActions.setSelectedBankAccountIndex, (state, action): BankAccountsState => ({
    ...state,
    selectedBankAccountIndex: action.bankAccountIndex,
  }))
);
