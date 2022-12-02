import { Component } from '@angular/core';
import { AuthFacade } from '../../global-stores/auth/auth.facade';
import { AuthStatus } from '../../shared/constants/enums/auth-status.enum';

@Component({
  selector: 'bnk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  readonly AuthStatus = AuthStatus;

  constructor(public authFacade: AuthFacade) {}
}
