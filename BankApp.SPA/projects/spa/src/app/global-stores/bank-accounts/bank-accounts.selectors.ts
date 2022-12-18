import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureState } from '../../shared/constants/enums/feature-state.enum';
import { BankAccountsState } from './bank-accounts.state';

const getBankAccountsState = createFeatureSelector<BankAccountsState>(FeatureState.BankAccounts);

export const getUserBankAccounts = createSelector(
  getBankAccountsState,
  state => state.bankAccounts
);
