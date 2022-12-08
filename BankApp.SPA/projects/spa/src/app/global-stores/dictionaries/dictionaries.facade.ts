import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AccountTypesActions } from './account-types/account-types.actions';
import { getAccountTypes } from './account-types/account-types.selectors';
import { DictionariesState } from './dictionaries.state';

@Injectable({
  providedIn: 'root',
})
export class DictionariesFacade {
  accountTypes$ = this.store.select(getAccountTypes);

  constructor(private store: Store<DictionariesState>) {}

  getAccountTypes(): void {
    this.store.dispatch(AccountTypesActions.getAccountTypes());
  }
}
