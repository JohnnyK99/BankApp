import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AddressBookEntry } from 'projects/api-client/src/models/address-book/address-book-entry.model';
import { AddressBookActions } from './address-book.actions';
import { getAddressBook, isAddingMode } from './address-book.selectors';
import { AddressBookState } from './address-book.state';

@Injectable({
  providedIn: 'root',
})
export class AddressBookFacade {
  addressBook$ = this.store.select(getAddressBook);
  isAddingMode$ = this.store.select(isAddingMode);

  constructor(private store: Store<AddressBookState>) {}

  fetchAddressBook(): void {
    this.store.dispatch(AddressBookActions.fetchAddressBook());
  }

  addEntry(entry: AddressBookEntry): void {
    this.store.dispatch(AddressBookActions.addEntry({ entry }));
  }

  enterAddingMode(): void {
    this.store.dispatch(AddressBookActions.enterAddingMode());
  }

  cancelAddingMode(): void {
    this.store.dispatch(AddressBookActions.cancelAddingMode());
  }

  removeEntry(accountNumber: string): void {
    this.store.dispatch(AddressBookActions.removeEntry({ accountNumber }));
  }
}
