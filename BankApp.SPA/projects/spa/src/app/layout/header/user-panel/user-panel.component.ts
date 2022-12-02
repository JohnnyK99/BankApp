import { Component } from '@angular/core';
import { AuthFacade } from '../../../global-stores/auth/auth.facade';

@Component({
  selector: 'bnk-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
})
export class UserPanelComponent {
  constructor(public authFacade: AuthFacade) { }
}
