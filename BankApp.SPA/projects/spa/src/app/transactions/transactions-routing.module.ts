import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewTransactionComponent } from './new-transaction/pages/new-transaction.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsRoutingModule { }
