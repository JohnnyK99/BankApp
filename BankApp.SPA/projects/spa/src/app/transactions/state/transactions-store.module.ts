import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FeatureState } from '../../shared/constants/enums/feature-state.enum';
import { TransactionsEffects } from './transactions.effects';
import { transactionsReducer } from './transactions.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(FeatureState.Transactions, transactionsReducer),
    EffectsModule.forFeature([TransactionsEffects]),
  ],
})
export class TransactionsStoreModule { }
