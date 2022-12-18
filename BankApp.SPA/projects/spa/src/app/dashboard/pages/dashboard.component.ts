import { Component, OnInit } from '@angular/core';
import { BankAccountsFacade } from '../../global-stores/bank-accounts/bank-accounts.facade';

@Component({
  selector: 'bnk-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(public facade: BankAccountsFacade) {}

  ngOnInit(): void {
    this.facade.fetchUserBankAccounts();
  }
}
