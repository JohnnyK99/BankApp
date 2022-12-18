import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FeatureState } from '../../shared/constants/enums/feature-state.enum';
import { BankAccountsEffects } from './bank-accounts.effects';
import { bankAccountsReducer } from './bank-accounts.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(FeatureState.BankAccounts, bankAccountsReducer),
    EffectsModule.forFeature([BankAccountsEffects]),
  ],
})
export class BankAccountsStoreModule { }
