import { Component } from '@angular/core';
import { AuthFacade } from '../../global-stores/auth/auth.facade';
import { AuthStatus } from '../../shared/constants/enums/auth-status.enum';

@Component({
  selector: 'bnk-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  readonly AuthStatus = AuthStatus;

  constructor(public authFacade: AuthFacade) { }

}
