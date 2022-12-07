import { Component, OnInit } from '@angular/core';
import { DashboardFacade } from '../state/dashboard.facade';

@Component({
  selector: 'bnk-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(public facade: DashboardFacade) {}

  ngOnInit(): void {
    this.facade.getUserBankAccounts();
  }
}
