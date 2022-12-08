import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FeatureState } from '../../shared/constants/enums/feature-state.enum';
import { AccountTypesEffects } from './account-types/account-types.effects';
import { dictionariesReducer } from './dictionaries.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(FeatureState.Dictionaries, dictionariesReducer),
    EffectsModule.forFeature([AccountTypesEffects]),
  ],
})
export class DictionariesStoreModule { }
