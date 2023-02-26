import { Component, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BankAccountTranslated } from 'projects/api-client/src/models/bank-accounts/bank-account-translated.model';
import { Transaction } from 'projects/api-client/src/models/transactions/transaction.model';
import { AppRoutes } from '../../../app-routes.constants';
import { TransactionDialogComponent } from '../transaction-dialog/transaction-dialog.component';
import { TransactionType } from '../../../shared/constants/enums/transaction-type.enum';
import { TransactionsConstants } from '../../../shared/constants/transactions.constants';
import { TranslationService } from '../../../shared/services/translation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bnk-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss'],
})
export class AccountCardComponent {
  @Input()
  account: BankAccountTranslated;

  readonly TransactionType = TransactionType;
  readonly AppRoutes = AppRoutes;
  readonly TransactionsConstants = TransactionsConstants;

  constructor(
    private modalService: NzModalService,
    private router: Router,
    private translationService: TranslationService
  ) {}

  openTransactionDialog(transaction: Transaction): void {
    this.modalService.create<TransactionDialogComponent>({
      nzTitle: this.translationService.getTranslation('transaction.transaction'),
      nzContent: TransactionDialogComponent,
      nzFooter: null,
      nzWidth: '60vw',
      nzComponentParams: {
        transaction,
      },
    });
  }

  navigateToTransaction(): void {
    this.router.navigate([AppRoutes.transactions]);
  }
}
