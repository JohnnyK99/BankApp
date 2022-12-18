import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AddressBookActions } from './address-book.actions';
import { getAddressBook } from './address-book.selectors';
import { AddressBookState } from './address-book.state';

@Injectable({
  providedIn: 'root',
})
export class AddressBookFacade {
  addressBook$ = this.store.select(getAddressBook);

  constructor(private store: Store<AddressBookState>) {}

  fetchAddressBook(): void {
    this.store.dispatch(AddressBookActions.fetchAddressBook());
  }
}
