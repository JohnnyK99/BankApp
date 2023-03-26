import { Component } from '@angular/core';
import { AppRoutes } from 'projects/spa/src/app/shared/constants/routes/app-routes.constants';
import { TransactionsRoutes } from 'projects/spa/src/app/shared/constants/routes/transactions-routes.constants';
import { TransactionsFacade } from '../../../state/transactions.facade';

@Component({
  templateUrl: './transaction-success.component.html',
  styleUrls: ['./transaction-success.component.scss'],
})
export class TransactionSuccessComponent {
  readonly AppRoutes = AppRoutes;
  readonly TransactionsRoutes = TransactionsRoutes;

  constructor(private facade: TransactionsFacade) { }

  downloadConfirmation(): void {
    this.facade.downloadNewConfirmation();
  }
}
