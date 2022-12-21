import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NewTransactionModule } from './new-transaction/new-transaction.module';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsListModule } from './transactions-list/transactions-list.module';

@NgModule({
  imports: [
    CommonModule,
    NewTransactionModule,
    TransactionsListModule,
    TransactionsRoutingModule,
  ],
  exports: [
  ],
  declarations: [
  ],
})
export class TransactionsModule { }
