import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { AddressBookEntry } from 'projects/api-client/src/models/address-book/address-book-entry.model';
import { AddressBookFacade } from 'projects/spa/src/app/global-stores/address-book/address-book.facade';
import { TransactionsConstants } from 'projects/spa/src/app/shared/constants/transactions.constants';
import { combineLatest, map, startWith } from 'rxjs';

@Component({
  selector: 'bnk-address-book',
  templateUrl: './address-book-dialog.component.html',
  styleUrls: ['./address-book-dialog.component.scss'],
})
export class AddressBookDialogComponent {
  readonly TransactionsConstants = TransactionsConstants;

  filterControl = this.fb.control<string>('');
  filter$ = this.filterControl.valueChanges;

  filteredEntries$ = combineLatest([
    this.facade.addressBook$,
    this.filter$.pipe(startWith('')),
  ]).pipe(map(([entries, filter]) => {
    if(entries == null) {
      return [];
    }

    return entries.filter(entry => entry.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) || entry.accountNumber.includes(filter));
  }));

  selected: AddressBookEntry | null = null;

  constructor(
    private facade: AddressBookFacade,
    private modal: NzModalRef,
    private fb: NonNullableFormBuilder
  ) {}

  onSelect(): void {
    this.modal.close(this.selected);
  }
}
