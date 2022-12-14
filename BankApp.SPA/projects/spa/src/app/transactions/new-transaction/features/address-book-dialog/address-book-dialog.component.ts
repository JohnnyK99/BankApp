import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { TransactionsConstants } from 'projects/spa/src/app/shared/constants/transactions.constants';
import {
  combineLatest, map, Observable, of, startWith
} from 'rxjs';

export interface SavedPayee {
  name: string;
  bankAccount: string;
}

@Component({
  selector: 'bnk-address-book',
  templateUrl: './address-book-dialog.component.html',
  styleUrls: ['./address-book-dialog.component.scss'],
})
export class AddressBookDialogComponent {
  readonly TransactionsConstants = TransactionsConstants;

  savedPayees: Observable<SavedPayee[]> = of([
    { name: 'Babcia', bankAccount: '10202030304040505060607070' },
    { name: 'Adam', bankAccount: '30345056701230123034503450' },
    { name: 'Dom', bankAccount: '40345056705670567056705670' },
  ]);

  filterControl = this.fb.control<string>('');
  filter$ = this.filterControl.valueChanges;

  filteredPayees$ = combineLatest([
    this.savedPayees,
    this.filter$.pipe(startWith('')),
  ]).pipe(map(([payees, filter]) =>
    payees.filter(payee => payee.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) || payee.bankAccount.includes(filter))
  ));

  selected: SavedPayee | null = null;

  constructor(
    private modal: NzModalRef,
    private fb: NonNullableFormBuilder
  ) {}

  onSelect(): void {
    //this.modal.destroy('abc');
    this.modal.close(this.selected);
  }
}
