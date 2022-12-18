import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewTransactionComponent } from './new-transaction/pages/new-transaction.component';
import { TransactionSuccessComponent } from './new-transaction/pages/transaction-success/transaction-success.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'new',
    pathMatch: 'full',
  },
  {
    path: 'new',
    component: NewTransactionComponent,
  },
  {
    path: 'success',
    component: TransactionSuccessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsRoutingModule { }
