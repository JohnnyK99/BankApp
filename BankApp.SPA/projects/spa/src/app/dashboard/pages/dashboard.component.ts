import { Component, OnInit, ViewChild } from '@angular/core';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { BaseComponent } from '../../base.component';
import { BankAccountsFacade } from '../../global-stores/bank-accounts/bank-accounts.facade';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends BaseComponent implements OnInit {

  @ViewChild('carousel')
  nzCarousel: NzCarouselComponent;

  constructor(public facade: BankAccountsFacade) {
    super();
  }

  ngOnInit(): void {
    this.facade.fetchUserBankAccounts();

    // this.observe(this.facade.selectedBankAccountId$)
    //   .subscribe(index => {
    //     if(index != null && this.nzCarousel != null) {
    //       this.nzCarousel.goTo(index);
    //     }
    //   });
  }
}
