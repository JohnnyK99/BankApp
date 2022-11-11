import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { LanguageStoreModule } from './language/language-store.module';

@NgModule({
  imports: [
    StoreModule.forRoot({}),
    LanguageStoreModule,
  ],
})
export class GlobalStoresModule { }
