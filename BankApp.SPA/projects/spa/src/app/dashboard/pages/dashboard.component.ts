import { Component, OnInit, ViewChild } from '@angular/core';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { BaseComponent } from '../../base.component';
import { BankAccountsFacade } from '../../global-stores/bank-accounts/bank-accounts.facade';
import { UserRoles } from '../../shared/constants/enums/user-roles.enum';
import { UserService } from '../../shared/services/user.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  @ViewChild('carousel')
  nzCarousel: NzCarouselComponent;

  constructor(
    public facade: BankAccountsFacade,
    private userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    if(this.userService.isInRole(UserRoles.Client)) {
      this.facade.fetchUserBankAccounts();
    } else {
      this.facade.clearUserBankAccounts();
    }
  }
}
