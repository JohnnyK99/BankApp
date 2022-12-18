import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { NewTransaction } from 'projects/api-client/src/models/transactions/new-transaction.model';
import { NewTransactionActions } from './new-transaction.actions';
import { getNewTransactionId } from './new-transaction.selectors';
import { NewTransactionState } from './new-transaction.state';

@Injectable({
  providedIn: 'root',
})
export class NewTransactionFacade {
  newTransactionId$ = this.store.select(getNewTransactionId);

  constructor(private store: Store<NewTransactionState>) {}

  createTransaction(transaction: NewTransaction): void {
    this.store.dispatch(NewTransactionActions.createTransaction({ transaction }));
  }

  downloadConfirmation(): void {
    this.store.dispatch(NewTransactionActions.downloadConfirmation());
  }
}
