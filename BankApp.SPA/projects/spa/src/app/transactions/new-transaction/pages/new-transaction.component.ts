import { Component } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddressBookEntry } from 'projects/api-client/src/models/address-book/address-book-entry.model';
import { BankAccountTranslated } from 'projects/api-client/src/models/bank-accounts/bank-account-translated.model';
import { NewTransaction } from 'projects/api-client/src/models/transactions/new-transaction.model';
import { combineLatest, filter } from 'rxjs';
import { AppRoutes } from '../../../app-routes.constants';
import { AddressBookFacade } from '../../../global-stores/address-book/address-book.facade';
import { BankAccountsFacade } from '../../../global-stores/bank-accounts/bank-accounts.facade';
import { TransactionsConstants } from '../../../shared/constants/transactions.constants';
import { TranslationService } from '../../../shared/services/translation.service';
import { TranslatedComponent } from '../../../translated.component';
import { AddressBookDialogComponent } from '../features/address-book-dialog/address-book-dialog.component';
import { ConfirmTransactionDialogComponent } from '../features/confirm-transaction-dialog/confirm-transaction-dialog.component';
import { NewTransactionFacade } from '../state/new-transaction.facade';

@Component({
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.scss'],
})
export class NewTransactionComponent extends TranslatedComponent {
  readonly TransactionsConstants = TransactionsConstants;

  formGroup = this.fb.group({
    selectedAccount: this.fb.control<BankAccountTranslated | null>(null, Validators.required),
    payeeAccountNumber: this.fb.control<string>('', [Validators.required, Validators.pattern(TransactionsConstants.accountNumberRegex)]),
    payeeName: this.fb.control<string>(''),
    amount: this.fb.control<number | null>(null, [Validators.required, Validators.min(TransactionsConstants.minTransactionAmount)]),
    title: this.fb.control<string>('', Validators.required),
    description: this.fb.control<string>(''),
  });

  get selectedAccountControl(): FormControl<BankAccountTranslated | null> {
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
    public bankAccountsFacade: BankAccountsFacade,
    private newTransactionFacade: NewTransactionFacade,
    private addressBookFacade: AddressBookFacade,
    private fb: NonNullableFormBuilder,
    private modalService: NzModalService,
    private route: ActivatedRoute,
    private router: Router,
    public override translationService: TranslationService
  ) {
    super(translationService);
    this.bankAccountsFacade.fetchUserBankAccounts();
    this.addressBookFacade.fetchAddressBook();
    this.payeeNameControl.disable({ emitEvent: false });
    this.amountControl.addValidators([this.amountValidator]);
    this.payeeAccountNumberControl.addValidators([this.accountNumberValidator]);

    this.observe(this.selectedAccountControl.valueChanges)
      .subscribe(() => {
        this.payeeAccountNumberControl.updateValueAndValidity();
        this.amountControl.updateValueAndValidity();
      });

    combineLatest([
      this.bankAccountsFacade.userBankAccounts$,
      this.route.queryParamMap,
    ]).subscribe(([accounts, params]) => {
      const id = Number(params.get('selectedAccountId'));

      if(isNaN(id) || accounts == null || accounts.length === 0) {
        return;
      }

      const selectedAccount = accounts.find(acc => acc.id === id) ?? accounts[0];
      this.selectedAccountControl.setValue(selectedAccount, { emitEvent: false });
    });
  }

  compareFn = (o1: BankAccountTranslated | null, o2: BankAccountTranslated | null): boolean => o1 != null && o2 != null && o1.id === o2.id;

  getAccountBookValue(): void {
    const dialog = this.modalService.create<AddressBookDialogComponent, AddressBookEntry>({
      nzTitle: this.translationService.getTranslation('new_transaction.saved_payees'),
      nzContent: AddressBookDialogComponent,
      nzFooter: null,
    });

    dialog.afterClose.pipe(filter(result => result != null)).subscribe(result => {
      this.formGroup.patchValue({
        payeeName: result.name,
        payeeAccountNumber: result.accountNumber,
      }, { emitEvent: false, onlySelf: true });

      this.payeeAccountNumberControl.markAsDirty();
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

  private amountValidator: ValidatorFn = (): ValidationErrors | null => {
    if(this.selectedAccountControl.value == null || this.amountControl.value == null) {
      return null;
    }

    const isValid = this.selectedAccountControl.value.balance >= this.amountControl.value;

    if(isValid) {
      return null;
    }

    return { amountTooHigh: true };
  };

  private accountNumberValidator: ValidatorFn = (): ValidationErrors | null => {
    if(this.selectedAccountControl.value == null) {
      return null;
    }

    const isValid = this.selectedAccountControl.value.accountNumber !== this.payeeAccountNumberControl.value;

    if(isValid) {
      return null;
    }

    return { sameAccount: true };
  };

  private openTransactionDialog(transaction: NewTransaction): void {
    this.modalService.create<ConfirmTransactionDialogComponent>({
      nzTitle: 'Potwierdź transakcję',
      nzContent: ConfirmTransactionDialogComponent,
      nzWidth: '60vw',
      nzOnOk: () => this.newTransactionFacade.createTransaction(transaction),
      nzOkText: 'Potwierdź',
      nzCancelText: 'Anuluj',
      nzComponentParams: {
        transaction,
      },
    });
  }
}
