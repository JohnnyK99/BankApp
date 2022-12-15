import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { NewTransactionState } from './new-transaction.state';

@Injectable({
  providedIn: 'root',
})
export class NewTransactionFacade {
  constructor(private store: Store<NewTransactionState>) {}
}
