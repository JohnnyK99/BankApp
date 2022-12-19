import { Component, Input } from '@angular/core';
import { Transaction } from 'projects/api-client/src/models/transactions/transaction.model';
import { TransactionType } from '../../../shared/constants/enums/transaction-type.enum';
import { TransactionsConstants } from '../../../shared/constants/transactions.constants';
import { DashboardFacade } from '../../state/dashboard.facade';

@Component({
  selector: 'bnk-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
  styleUrls: ['./transaction-dialog.component.scss'],
})
export class TransactionDialogComponent {
  @Input()
  transaction: Transaction;

  readonly TransactionsConstants = TransactionsConstants;
  readonly TransactionType = TransactionType;

  constructor(public facade: DashboardFacade) { }
}
