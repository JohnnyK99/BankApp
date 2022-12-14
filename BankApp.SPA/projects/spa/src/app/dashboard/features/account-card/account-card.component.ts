import { Component, Input } from '@angular/core';
import { BankAccountTranslated } from 'projects/api-client/src/models/bank-accounts/bank-account-translated.model';
import { AppRoutes } from '../../../app-routes.constants';
import { TransactionType } from '../../../shared/constants/enums/transaction-type.enum';
import { TransactionsConstants } from '../../../shared/constants/transactions.constants';
import { TranslatedComponent } from '../../../translated.component';

@Component({
  selector: 'bnk-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss'],
})
export class AccountCardComponent extends TranslatedComponent {
  @Input()
  account: BankAccountTranslated;

  readonly TransactionType = TransactionType;
  readonly AppRoutes = AppRoutes;
  readonly TransactionsConstants = TransactionsConstants;
}
