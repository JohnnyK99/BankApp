import { AddressBookEntry } from 'projects/api-client/src/models/address-book/address-book-entry.model';

export interface AddressBookState {
  entries: AddressBookEntry[] | null;
}
