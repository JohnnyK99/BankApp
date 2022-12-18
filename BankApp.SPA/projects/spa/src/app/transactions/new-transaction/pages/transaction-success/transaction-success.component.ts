import { Component } from '@angular/core';
import { NewTransactionFacade } from '../../state/new-transaction.facade';

@Component({
  selector: 'bnk-transaction-success',
  templateUrl: './transaction-success.component.html',
  styleUrls: ['./transaction-success.component.scss'],
})
export class TransactionSuccessComponent {

  constructor(private facade: NewTransactionFacade) { }

  downloadConfirmation(): void {
    this.facade.downloadConfirmation();
  }
}
