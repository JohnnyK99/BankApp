import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NewTransactionModule } from './new-transaction/new-transaction.module';
import { TransactionsRoutingModule } from './transactions-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NewTransactionModule,
    TransactionsRoutingModule,
  ],
  exports: [
  ],
})
export class TransactionsModule { }
