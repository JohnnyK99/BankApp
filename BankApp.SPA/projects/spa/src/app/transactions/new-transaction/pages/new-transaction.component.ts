import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { filter } from 'rxjs';
import { TransactionsConstants } from '../../../shared/constants/transactions.constants';
import { TranslationService } from '../../../shared/services/translation.service';
import { TranslatedComponent } from '../../../translated.component';
import { AddressBookDialogComponent, SavedPayee } from '../features/address-book-dialog/address-book-dialog.component';
import { NewTransactionFacade } from '../state/new-transaction.facade';

export interface BaseAccountModel {
  id: number;
  accountName: Map<string, string>;
  accountNumber: string;
  balance: number;
}

@Component({
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.scss'],
})
export class NewTransactionComponent extends TranslatedComponent {
  readonly TransactionsConstants = TransactionsConstants;

  allAccounts: BaseAccountModel[] = [
    { id: 1, accountName: new Map<string, string>([['pl', 'Konto oszczędnościowe'], ['en', 'Savings account']]), accountNumber: '20101010101010101010101010', balance: 2000 },
    { id: 2, accountName: new Map<string, string>([['pl', 'Konto dla młodych'], ['en', 'Youth account']]), accountNumber: '11202020202020202020202020', balance: 12340.22 },
    { id: 3, accountName: new Map<string, string>([['pl', 'Konto standardowe'], ['en', 'Standard account']]), accountNumber: '20101010101010101010101010', balance: 135.90 },
  ];

  formGroup = this.fb.group({
    selectedAccount: this.fb.control<BaseAccountModel | null>(this.allAccounts[0], Validators.required),
    payeeAccountNumber: this.fb.control<string>('', [Validators.required, Validators.pattern(TransactionsConstants.accountNumberRegex)]), //TODO: Add pattern
    payeeName: this.fb.control<string>('', Validators.required),
    amount: this.fb.control<number | null>(null, Validators.required),
    title: this.fb.control<string>('', Validators.required),
    description: this.fb.control<string>(''),
  });

  constructor(
    public facade: NewTransactionFacade,
    private fb: NonNullableFormBuilder,
    private modalService: NzModalService,
    public override translationService: TranslationService
  ) {
    super(translationService);
    this.formGroup.controls.selectedAccount.valueChanges.subscribe((value) => console.log(value));
  }

  compareFn = (o1: BaseAccountModel, o2: BaseAccountModel): boolean => (o1 !== null && o2 !== null && o1.id === o2.id);

  getAccountBookValue(): void {
    const dialog = this.modalService.create<AddressBookDialogComponent, SavedPayee>({
      nzTitle: this.translationService.getTranslation('new_transaction.saved_payees'),
      nzContent: AddressBookDialogComponent,
      nzFooter: null,
    });

    dialog.afterClose.pipe(filter(result => result != null)).subscribe(result => {
      this.formGroup.patchValue({
        payeeName: result.name,
        payeeAccountNumber: result.bankAccount,
      }, { emitEvent: false });
    });
  }
}
