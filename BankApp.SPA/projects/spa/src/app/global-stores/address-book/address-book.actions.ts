import { createAction, props } from '@ngrx/store';
import { AddNewEntryProps } from './props/add-new-entry.props';
import { GetAddressBookSuccessProps } from './props/get-address-book-success.props';
import { RemoveEntryProps } from './props/remove-entry.props';

export const AddressBookActions = {
  fetchAddressBook: createAction(
    '[Address book] Fetch address book'
  ),
  fetchAddressBookSuccess: createAction(
    '[Address book] Fetch address book success',
    props<GetAddressBookSuccessProps>()
  ),
  fetchAddressBookFail: createAction(
    '[Address book] Fetch address book fail'
  ),
  addEntry: createAction(
    '[Address book] Add entry',
    props<AddNewEntryProps>()
  ),
  addEntrySuccess: createAction(
    '[Address book] Add entry success'
  ),
  addEntryFail: createAction(
    '[Address book] Add entry fail'
  ),
  removeEntry: createAction(
    '[Address book] Remove entry',
    props<RemoveEntryProps>()
  ),
  removeEntrySuccess: createAction(
    '[Address book] Remove entry success'
  ),
  removeEntryFail: createAction(
    '[Address book] Remove entry fail'
  ),
  enterAddingMode: createAction(
    '[Address book] Enter adding mode'
  ),
  cancelAddingMode: createAction(
    '[Address book] Cancel adding mode'
  ),
};
