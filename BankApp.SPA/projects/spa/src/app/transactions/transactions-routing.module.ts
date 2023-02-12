import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { UserRoles } from '../shared/constants/enums/user-roles.enum';
import { NewTransactionComponent } from './new-transaction/pages/new-transaction.component';
import { TransactionSuccessComponent } from './new-transaction/pages/transaction-success/transaction-success.component';
import { TransactionsListComponent } from './transactions-list/pages/transactions-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'new',
    pathMatch: 'full',
  },
  {
    path: 'new',
    component: NewTransactionComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRoles.Client] },
  },
  {
    path: 'success',
    component: TransactionSuccessComponent,
  },
  {
    path: 'list',
    component: TransactionsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsRoutingModule { }
