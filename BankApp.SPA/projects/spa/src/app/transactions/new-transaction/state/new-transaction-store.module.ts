import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FeatureState } from '../../../shared/constants/enums/feature-state.enum';
import { NewTransactionEffects } from './new-transaction.effects';
import { newTransactionReducer } from './new-transaction.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(FeatureState.NewTransaction, newTransactionReducer),
    EffectsModule.forFeature([NewTransactionEffects]),
  ],
})
export class NewTransactionStoreModule { }
