import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BankAccountsActions } from './bank-accounts.actions';
import { getSelectedBankAccount, getSelectedBankAccountIndex, getUserBankAccounts } from './bank-accounts.selectors';
import { BankAccountsState } from './bank-accounts.state';

@Injectable({
  providedIn: 'root',
})
export class BankAccountsFacade {
  userBankAccounts$ = this.store.select(getUserBankAccounts);
  selectedBankAccount$ = this.store.select(getSelectedBankAccount);
  selectedBankAccountId$ = this.store.select(getSelectedBankAccountIndex);

  constructor(private store: Store<BankAccountsState>) {}

  fetchUserBankAccounts(): void {
    this.store.dispatch(BankAccountsActions.fetchUserBankAccounts());
  }

  setSelectedBankAccountIndex(bankAccountIndex: number): void {
    this.store.dispatch(BankAccountsActions.setSelectedBankAccountIndex({ bankAccountIndex }));
  }
}
