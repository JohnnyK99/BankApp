import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { FeatureStates } from '../../shared/constants/enums/feature-states.enum';
import { languageReducer } from './language.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(FeatureStates.Language, languageReducer),
  ],
})
export class LanguageStoreModule { }
