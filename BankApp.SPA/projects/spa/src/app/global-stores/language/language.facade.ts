import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { LanguageActions } from './language.actions';
import { getAvailableLanguages, getSelectedLanguageCode, getSelectedLanguageFlag } from './language.selectors';
import { LanguageState } from './language.state';

@Injectable({ providedIn: 'root' })
export class LanguageFacade {
  availableLanguages$ = this.store.select(getAvailableLanguages);
  selectedLanguage$ = this.store.select(getSelectedLanguageCode);
  selectedLanguageFlag$ = this.store.select(getSelectedLanguageFlag);

  constructor(private store: Store<LanguageState>) {}

  setLanguage(code: string): void {
    this.store.dispatch(LanguageActions.selectLanguage({ code }));
  }
}
