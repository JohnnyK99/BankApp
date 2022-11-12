import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { FeatureState } from '../../shared/constants/enums/feature-state.enum';
import { languageReducer } from './language.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(FeatureState.Language, languageReducer),
  ],
})
export class LanguageStoreModule { }
