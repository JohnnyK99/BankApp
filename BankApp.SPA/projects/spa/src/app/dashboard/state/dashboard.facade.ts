import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { DashboardActions } from './dashboard.actions';
import { getUserBankAccounts } from './dashboard.selectors';
import { DashboardState } from './dashboard.state';

@Injectable({
  providedIn: 'root',
})
export class DashboardFacade {
  bankAccounts$ = this.store.select(getUserBankAccounts);

  constructor(private store: Store<DashboardState>) {}

  getUserBankAccounts(): void {
    this.store.dispatch(DashboardActions.getUserBankAccounts());
  }
}
