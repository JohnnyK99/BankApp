import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FeatureState } from '../../shared/constants/enums/feature-state.enum';
import { AddressBookEffects } from './address-book.effects';
import { addressBookReducer } from './address-book.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(FeatureState.AddressBook, addressBookReducer),
    EffectsModule.forFeature([AddressBookEffects]),
  ],
})
export class AddressBookStoreModule { }
