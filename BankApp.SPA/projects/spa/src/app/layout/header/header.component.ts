import { Component } from '@angular/core';
import { AppRoutes } from '../../app-routes.constants';
import { AuthFacade } from '../../global-stores/auth/auth.facade';
import { AuthStatus } from '../../shared/constants/enums/auth-status.enum';

@Component({
  selector: 'bnk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  readonly AuthStatus = AuthStatus;
  readonly AppRoutes = AppRoutes;

  constructor(public authFacade: AuthFacade) {}
}
