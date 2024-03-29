import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { AddressBookStoreModule } from './address-book/address-book-store.module';
import { AuthStoreModule } from './auth/auth-store.module';
import { BankAccountsStoreModule } from './bank-accounts/bank-accounts-store.module';
import { ClientsStoreModule } from './clients/clients-store.module';
import { DictionariesStoreModule } from './dictionaries/dictionaries-store.module';
import { LanguageStoreModule } from './language/language-store.module';

@NgModule({
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    AuthStoreModule,
    AddressBookStoreModule,
    BankAccountsStoreModule,
    ClientsStoreModule,
    DictionariesStoreModule,
    LanguageStoreModule,
  ],
})
export class GlobalStoresModule { }
