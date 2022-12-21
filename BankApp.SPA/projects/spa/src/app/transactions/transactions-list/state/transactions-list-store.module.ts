import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FeatureState } from '../../../shared/constants/enums/feature-state.enum';
import { TransactionsListEffects } from './transactions-list.effects';
import { transactionsListReducer } from './transactions-list.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(FeatureState.TransactionsList, transactionsListReducer),
    EffectsModule.forFeature([TransactionsListEffects]),
  ],
})
export class TransactionsListStoreModule { }
