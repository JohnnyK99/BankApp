import { Component, Input } from '@angular/core';
import { NewTransaction } from 'projects/api-client/src/models/transactions/new-transaction.model';
import { TransactionsConstants } from 'projects/spa/src/app/shared/constants/transactions.constants';

@Component({
  templateUrl: './confirm-transaction-dialog.component.html',
  styleUrls: ['./confirm-transaction-dialog.component.scss'],
})
export class ConfirmTransactionDialogComponent {
  @Input()
  transaction: NewTransaction;

  readonly TransactionsConstants = TransactionsConstants;

  constructor() { }

}
