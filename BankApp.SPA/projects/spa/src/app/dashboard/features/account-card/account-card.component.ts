import { Component, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BankAccountTranslated } from 'projects/api-client/src/models/bank-accounts/bank-account-translated.model';
import { Transaction } from 'projects/api-client/src/models/transactions/transaction.model';
import { AppRoutes } from '../../../shared/constants/routes/app-routes.constants';
import { TransactionDialogComponent } from '../transaction-dialog/transaction-dialog.component';
import { TransactionType } from '../../../shared/constants/enums/transaction-type.enum';
import { TransactionsConstants } from '../../../shared/constants/transactions.constants';
import { TranslationService } from '../../../shared/services/translation.service';
import { Router } from '@angular/router';
import { TransactionsRoutes } from '../../../shared/constants/routes/transactions-routes.constants';
import { UserRoles } from '../../../shared/constants/enums/user-roles.enum';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'bnk-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss'],
})
export class AccountCardComponent {
  @Input()
  account: BankAccountTranslated;

  readonly AppRoutes = AppRoutes;
  readonly TransactionsConstants = TransactionsConstants;
  readonly TransactionsRoutes = TransactionsRoutes;
  readonly TransactionType = TransactionType;
  readonly UserRoles = UserRoles;

  constructor(
    private modalService: NzModalService,
    private router: Router,
    private translationService: TranslationService,
    public userService: UserService
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
