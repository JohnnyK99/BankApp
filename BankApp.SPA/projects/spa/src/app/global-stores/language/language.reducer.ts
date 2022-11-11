import { createReducer, on } from '@ngrx/store';
import { LanguageConstants } from '../../shared/constants/language.constants';
import { LocalStorageHelpers } from '../../shared/helpers/local-storage.helpers';
import { LanguageActions } from './language.actions';
import { LanguageState } from './language.state';

const initialState: LanguageState = {
  availableLanguages: LanguageConstants.availableLanguages,
  selectedLanguageCode: LocalStorageHelpers.getSelectedLanguage() ?? LanguageConstants.defaultLanguageCode,
};

export const languageReducer = createReducer<LanguageState>(
  initialState,
  on(LanguageActions.selectLanguage, (state, action) => ({
    ...state,
    selectedLanguageCode: action.code,
  }))
);
