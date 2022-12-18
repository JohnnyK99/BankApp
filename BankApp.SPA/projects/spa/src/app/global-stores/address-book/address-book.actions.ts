import { createAction, props } from '@ngrx/store';
import { GetAddressBookSuccessProps } from './props/get-address-book-success.props';

//TODO: Implement adding and removing entries?
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
};
