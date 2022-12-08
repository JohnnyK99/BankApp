import { createFeatureSelector } from '@ngrx/store';
import { FeatureState } from '../../shared/constants/enums/feature-state.enum';
import { DictionariesState } from './dictionaries.state';

export const getDictionariesState = createFeatureSelector<DictionariesState>(FeatureState.Dictionaries);
