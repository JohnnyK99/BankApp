import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BankAccountsActions } from './bank-accounts.actions';
import { getUserBankAccounts } from './bank-accounts.selectors';
import { BankAccountsState } from './bank-accounts.state';

@Injectable({
  providedIn: 'root',
})
export class BankAccountsFacade {
  userBankAccounts$ = this.store.select(getUserBankAccounts);

  constructor(private store: Store<BankAccountsState>) {}

  fetchUserBankAccounts(): void {
    this.store.dispatch(BankAccountsActions.fetchUserBankAccounts());
  }
}
