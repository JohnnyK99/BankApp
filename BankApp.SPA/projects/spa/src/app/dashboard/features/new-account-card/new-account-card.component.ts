import { Component, OnInit } from '@angular/core';
import { AccountTypeTranslated } from 'projects/api-client/src/models/dictionaries/account-types/account-type-translated.model';
import { BankAccountsFacade } from '../../../global-stores/bank-accounts/bank-accounts.facade';
import { DictionariesFacade } from '../../../global-stores/dictionaries/dictionaries.facade';

@Component({
  selector: 'bnk-new-account-card',
  templateUrl: './new-account-card.component.html',
  styleUrls: ['./new-account-card.component.scss'],
})
export class NewAccountCardComponent implements OnInit {
  isActive = false;
  selectedType: AccountTypeTranslated | null = null;

  constructor(
    public dictionariesFacade: DictionariesFacade,
    private bankAccountsFacade: BankAccountsFacade
  ) {}

  compareFn = (o1: AccountTypeTranslated | null, o2: AccountTypeTranslated | null): boolean => o1 != null && o2 != null && o1.id === o2.id;

  ngOnInit(): void {
    this.dictionariesFacade.getAccountTypes();
  }

  onActivate(): void {
    this.isActive = true;
  }

  onCancel(): void {
    this.isActive = false;
  }

  onAdd(): void {
    if(this.selectedType == null) {
      return;
    }

    this.bankAccountsFacade.createBankAccount(this.selectedType.id);
    this.isActive = false;
  }

}
