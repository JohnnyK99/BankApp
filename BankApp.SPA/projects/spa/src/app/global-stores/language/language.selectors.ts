import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureState } from '../../shared/constants/enums/feature-state.enum';
import { LanguageState } from './language.state';

const getLangState = createFeatureSelector<LanguageState>(FeatureState.Language);

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
