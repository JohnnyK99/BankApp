import { Component, OnInit, ViewChild } from '@angular/core';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { BaseComponent } from '../../base.component';
import { BankAccountsFacade } from '../../global-stores/bank-accounts/bank-accounts.facade';
import { DashboardFacade } from '../state/dashboard.facade';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  @ViewChild('carousel')
  nzCarousel: NzCarouselComponent;

  constructor(
    public bankAccountsFacade: BankAccountsFacade,
    public dashboardFacade: DashboardFacade
  ) {
    super();
  }

  ngOnInit(): void {
    this.dashboardFacade.init();
  }
}
