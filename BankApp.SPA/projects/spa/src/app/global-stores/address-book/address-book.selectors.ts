import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureState } from '../../shared/constants/enums/feature-state.enum';
import { AddressBookState } from './address-book.state';

const getAddressBookState = createFeatureSelector<AddressBookState>(FeatureState.AddressBook);

export const getAddressBook = createSelector(
  getAddressBookState,
  state => state.entries
);
