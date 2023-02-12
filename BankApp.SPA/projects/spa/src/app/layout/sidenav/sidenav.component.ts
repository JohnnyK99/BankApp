import { Component } from '@angular/core';
import { AuthFacade } from '../../global-stores/auth/auth.facade';
import { AuthStatus } from '../../shared/constants/enums/auth-status.enum';
import { UserRoles } from '../../shared/constants/enums/user-roles.enum';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'bnk-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  readonly AuthStatus = AuthStatus;
  readonly UserRoles = UserRoles;

  constructor(
    public authFacade: AuthFacade,
    public userService: UserService
  ) { }

}
