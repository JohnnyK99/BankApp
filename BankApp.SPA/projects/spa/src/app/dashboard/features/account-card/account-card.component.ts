import { Component, Input } from '@angular/core';
import { BankAccountTranslated } from 'projects/api-client/src/models/bank-accounts/bank-account-translated.model';
import { TransactionType } from '../../../shared/constants/enums/transaction-type.enum';
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
}
