import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { DashboardActions } from './dashboard.actions';

@Injectable({
  providedIn: 'root',
})
export class DashboardFacade {
  constructor(private store: Store) {}

  init(): void {
    this.store.dispatch(DashboardActions.init());
  }

  downloadConfirmation(transactionId: number): void {
    this.store.dispatch(DashboardActions.downloadConfirmation({ transactionId }));
  }
}
