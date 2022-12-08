import { createReducer, on } from '@ngrx/store';
import { AccountTypesActions } from './account-types/account-types.actions';
import { DictionariesState } from './dictionaries.state';

const initialState: DictionariesState = {
  accountTypes: null,
};

export const dictionariesReducer = createReducer<DictionariesState>(
  initialState,
  on(AccountTypesActions.getAccountTypesSuccess, (state, action): DictionariesState => ({
    ...state,
    accountTypes: action.accountTypes,
  }))
);
