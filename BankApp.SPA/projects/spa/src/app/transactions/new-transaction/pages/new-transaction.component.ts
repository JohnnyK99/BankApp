import { Component } from '@angular/core';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NewTransaction } from 'projects/api-client/src/models/transactions/new-transaction.model';
import { filter } from 'rxjs';
import { AppRoutes } from '../../../app-routes.constants';
import { TransactionsConstants } from '../../../shared/constants/transactions.constants';
import { TranslationService } from '../../../shared/services/translation.service';
import { TranslatedComponent } from '../../../translated.component';
import { AddressBookDialogComponent, SavedPayee } from '../features/address-book-dialog/address-book-dialog.component';
import { ConfirmTransactionDialogComponent } from '../features/confirm-transaction-dialog/confirm-transaction-dialog.component';
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
    payeeName: this.fb.control<string>(''),
    amount: this.fb.control<number | null>(null, Validators.required),
    title: this.fb.control<string>('', Validators.required),
    description: this.fb.control<string>(''),
  });

  get selectedAccountControl(): FormControl<BaseAccountModel | null> {
    return this.formGroup.controls.selectedAccount;
  }

  get payeeAccountNumberControl(): FormControl<string> {
    return this.formGroup.controls.payeeAccountNumber;
  }

  get payeeNameControl(): FormControl<string> {
    return this.formGroup.controls.payeeName;
  }

  get titleControl(): FormControl<string> {
    return this.formGroup.controls.title;
  }

  get amountControl(): FormControl<number | null> {
    return this.formGroup.controls.amount;
  }

  constructor(
    public facade: NewTransactionFacade,
    private fb: NonNullableFormBuilder,
    private modalService: NzModalService,
    private route: ActivatedRoute,
    private router: Router,
    public override translationService: TranslationService
  ) {
    super(translationService);
    this.payeeNameControl.disable({ emitEvent: false });

    this.observe(this.route.queryParamMap).subscribe(map => {
      const id = Number(map.get('selectedAccountId'));

      if(isNaN(id)) {
        return;
      }

      const selectedAccount = this.allAccounts.find(acc => acc.id === id);

      if(selectedAccount == null) {
        return;
      }

      this.selectedAccountControl.setValue(selectedAccount, { emitEvent: false });
    });
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

      this.payeeAccountNumberControl.updateValueAndValidity();
    });
  }

  createTransaction(): void {
    if(!this.formGroup.valid || this.selectedAccountControl.value == null || this.amountControl.value == null) {
      return;
    }

    const newTransaction: NewTransaction = {
      accountNumberFrom: this.selectedAccountControl.value.accountNumber,
      accountNumberTo: this.payeeAccountNumberControl.value,
      title: this.titleControl.value,
      description: this.formGroup.controls.description.value,
      amount: this.amountControl.value,
    };

    this.openTransactionDialog(newTransaction);
  }

  goBack(): void {
    this.router.navigate([AppRoutes.dashboard]);
  }

  private openTransactionDialog(transaction: NewTransaction): void {
    this.modalService.create<ConfirmTransactionDialogComponent>({
      nzTitle: 'Potwierdź transakcję',
      nzContent: ConfirmTransactionDialogComponent,
      nzWidth: '60vw',
      nzOnOk: () => this.facade.createTransaction(transaction),
      nzOkText: 'Potwierdź',
      nzCancelText: 'Anuluj',
      nzComponentParams: {
        transaction,
      },
    });
  }
}
