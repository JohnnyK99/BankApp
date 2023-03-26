import { Component } from '@angular/core';
import { AppRoutes } from '../../shared/constants/routes/app-routes.constants';
import { AuthFacade } from '../../global-stores/auth/auth.facade';
import { AuthStatus } from '../../shared/constants/enums/auth-status.enum';
import { UserRoles } from '../../shared/constants/enums/user-roles.enum';
import { UserService } from '../../shared/services/user.service';
import { TransactionsRoutes } from '../../shared/constants/routes/transactions-routes.constants';

@Component({
  selector: 'bnk-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  readonly AuthStatus = AuthStatus;
  readonly UserRoles = UserRoles;
  readonly AppRoutes = AppRoutes;
  readonly TransactionsRoutes = TransactionsRoutes;

  constructor(
    public authFacade: AuthFacade,
    public userService: UserService
  ) { }

}
