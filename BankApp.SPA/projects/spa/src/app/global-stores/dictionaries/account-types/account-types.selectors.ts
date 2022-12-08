import { createSelector } from '@ngrx/store';
import { getDictionariesState } from '../dictionaries.selectors';

export const getAccountTypes = createSelector(
  getDictionariesState,
  state => state.accountTypes
);
