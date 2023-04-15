import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { AddressBookEntry } from 'projects/api-client/src/models/address-book/address-book-entry.model';
import { BaseComponent } from 'projects/spa/src/app/base.component';
import { AddressBookFacade } from 'projects/spa/src/app/global-stores/address-book/address-book.facade';
import { TransactionsConstants } from 'projects/spa/src/app/shared/constants/transactions.constants';
import { StringValidators } from 'projects/spa/src/app/shared/validators/string-validators';
import { combineLatest, filter, map, startWith } from 'rxjs';

@Component({
  templateUrl: './address-book-dialog.component.html',
  styleUrls: ['./address-book-dialog.component.scss'],
})
export class AddressBookDialogComponent extends BaseComponent implements OnInit {
  readonly TransactionsConstants = TransactionsConstants;

  filterFormControl = this.fb.control<string>('');
  selectedEntryFormControl = this.fb.control<AddressBookEntry | null>(null);
  entries: AddressBookEntry[] = [];

  filter$ = this.filterFormControl.valueChanges;

  filteredEntries$ = combineLatest([
    this.facade.addressBook$,
    this.filter$.pipe(startWith('')),
  ]).pipe(map(([entries, filterText]) => {
    if(entries == null) {
      return [];
    }

    return entries.filter(entry => entry.name.toLocaleLowerCase().includes(filterText.toLocaleLowerCase()) || entry.accountNumber.includes(filterText));
  }));

  formGroup = this.fb.group({
    name: this.fb.control<string>('', StringValidators.required),
    accountNumber: this.fb.control<string>('', [StringValidators.required, Validators.pattern(TransactionsConstants.accountNumberRegex)]),
  });

  get accountNumberControl(): FormControl<string> {
    return this.formGroup.controls.accountNumber;
  }

  constructor(
    public facade: AddressBookFacade,
    private modal: NzModalRef,
    private fb: NonNullableFormBuilder
  ) {
    super();
    this.accountNumberControl.addValidators([this.uniqueValidator]);
  }

  ngOnInit(): void {
    this.modal.afterClose.subscribe(() => this.facade.cancelAddingMode());

    this.observe(this.facade.addressBook$)
      .pipe(filter(Boolean))
      .subscribe(book => this.entries = book);

    this.observe(this.facade.isAddingMode$)
      .subscribe(() => this.formGroup.reset());

    this.observe(this.selectedEntryFormControl.valueChanges)
      .pipe(filter(Boolean))
      .subscribe(entry => this.modal.close(entry));
  }

  onEntryAdd(): void {
    this.facade.addEntry(this.formGroup.getRawValue());
  }

  onEntryDelete(event: MouseEvent, accountNumber: string): void {
    event.stopPropagation();
    event.preventDefault();
    this.facade.removeEntry(accountNumber);
  }

  private uniqueValidator: ValidatorFn = (): ValidationErrors | null => {
    if(this.accountNumberControl.value == null) {
      return null;
    }

    const isValid = this.entries.some(entry => entry.accountNumber === this.accountNumberControl.value) === false;

    if(isValid) {
      return null;
    }

    return { unique: true };
  };
}
