import { Component } from '@angular/core';
import { AuthFacade } from './global-stores/auth/auth.facade';
import { AuthStatus } from './shared/constants/enums/auth-status.enum';

@Component({
  selector: 'bnk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly AuthStatus = AuthStatus;

  constructor(public authFacade: AuthFacade) {}
}
