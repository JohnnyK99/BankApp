import { Component } from '@angular/core';
import { TransactionsFacade } from '../../../state/transactions.facade';

@Component({
  templateUrl: './transaction-success.component.html',
  styleUrls: ['./transaction-success.component.scss'],
})
export class TransactionSuccessComponent {

  constructor(private facade: TransactionsFacade) { }

  downloadConfirmation(): void {
    this.facade.downloadNewConfirmation();
  }
}
