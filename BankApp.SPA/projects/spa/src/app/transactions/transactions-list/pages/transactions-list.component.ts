import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { filter } from 'rxjs';
import { AppRoutes } from '../../../shared/constants/routes/app-routes.constants';
import { BaseComponent } from '../../../base.component';
import { BankAccountsFacade } from '../../../global-stores/bank-accounts/bank-accounts.facade';
import { SortDirection } from '../../../shared/constants/enums/sort-direction.enum';
import { TransactionType } from '../../../shared/constants/enums/transaction-type.enum';
import { TransactionsConstants } from '../../../shared/constants/transactions.constants';
import { PaginationParameters } from '../../../shared/models/pagination-parameters.model';
import { TransactionsFacade } from '../../state/transactions.facade';
import { DateFormat } from '../../../shared/constants/enums/date-format.enum';
import { NonNullableFormBuilder } from '@angular/forms';

@Component({
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
})
export class TransactionsListComponent extends BaseComponent implements OnInit {
  readonly TransactionsConstants = TransactionsConstants;
  readonly TransactionType = TransactionType;
  readonly DateFormat = DateFormat;

  filtersFormGroup = this.fb.group({
    bankAccountNumber: this.fb.control<string | null>(null),
    transactionTypes: this.fb.control<TransactionType[]>([]),
    dateFrom: this.fb.control<Date | null>(null),
    dateTo: this.fb.control<Date | null>(null),
    searchBy: this.fb.control<string>(''),
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    public bankAccountsFacade: BankAccountsFacade,
    public transactionsFacade: TransactionsFacade
  ) {
    super();
  }

  ngOnInit(): void {
    this.bankAccountsFacade.fetchUserBankAccounts();

    this.observe(this.bankAccountsFacade.selectedBankAccount$)
      .pipe(filter(Boolean))
      .subscribe(acc => this.transactionsFacade.setFilters({ bankAccountNumber: acc.accountNumber }));

    this.observe(this.transactionsFacade.filters$)
      .subscribe(filters => this.filtersFormGroup.setValue(filters, { emitEvent: false }));

    this.observe(this.filtersFormGroup.valueChanges)
      .subscribe(value => this.transactionsFacade.setFilters(value));
  }

  goBack(): void {
    this.router.navigate([AppRoutes.dashboard]);
  }

  onTableParamsChange(params: NzTableQueryParams): void {
    const paginationParams: Partial<PaginationParameters> = {
      pageSize: params.pageSize,
      currentPage: params.pageIndex,
    };

    const sortItem = params.sort.find(item => item.value != null);

    if(sortItem) {
      this.transactionsFacade.setTableParams(paginationParams, { sortDirection: sortItem.value === 'ascend' ? SortDirection.Ascending : SortDirection.Descending, column: sortItem.key });
    } else {
      this.transactionsFacade.setTableParams(paginationParams, { sortDirection: undefined, column: undefined });
    }
  }

  disabledDateFrom = (dateTo: Date | null) => (current: Date): boolean => {
    return dateTo == null ? current > new Date() : current > dateTo;
  };

  disabledDateTo = (dateFrom: Date | null) => (current: Date): boolean => {
    if(dateFrom == null) {
      return false;
    }

    return current < dateFrom;
  };

}
