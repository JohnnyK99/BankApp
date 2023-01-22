import { createReducer, on } from '@ngrx/store';
import { AddressBookActions } from './address-book.actions';
import { AddressBookState } from './address-book.state';

const initialState: AddressBookState = {
  entries: null,
  isAddingMode: false,
};

export const addressBookReducer = createReducer<AddressBookState>(
  initialState,
  on(AddressBookActions.fetchAddressBookSuccess, (state, action): AddressBookState => ({
    ...state,
    entries: action.entries,
  })),
  on(AddressBookActions.enterAddingMode, (state): AddressBookState => ({
    ...state,
    isAddingMode: true,
  })),
  on(AddressBookActions.cancelAddingMode, AddressBookActions.addEntrySuccess, (state): AddressBookState => ({
    ...state,
    isAddingMode: false,
  }))
);
