import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { NewTransaction } from 'projects/api-client/src/models/transactions/new-transaction.model';
import { NewTransactionState } from './new-transaction.state';

@Injectable({
  providedIn: 'root',
})
export class NewTransactionFacade {
  constructor(private store: Store<NewTransactionState>) {}

  createTransaction(transaction: NewTransaction): void {
    console.log(JSON.stringify(transaction));
  }
}
