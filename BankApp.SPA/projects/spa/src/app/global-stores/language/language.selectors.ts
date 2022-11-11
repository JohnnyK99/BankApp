import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureStates } from '../../shared/constants/enums/feature-states.enum';
import { LanguageState } from './language.state';

const getLangState = createFeatureSelector<LanguageState>(FeatureStates.Language);

export const getAvailableLanguages = createSelector(
  getLangState,
  state => state.availableLanguages
);

export const getSelectedLanguageCode = createSelector(
  getLangState,
  state => state.selectedLanguageCode
);

export const getSelectedLanguageFlag = createSelector(
  getLangState,
  state => state.availableLanguages.find(lang => lang.code === state.selectedLanguageCode)?.flag
);
