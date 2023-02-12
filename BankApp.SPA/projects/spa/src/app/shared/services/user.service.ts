import { Injectable } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { AuthFacade } from '../../global-stores/auth/auth.facade';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseComponent {
  userRoles: string[];

  constructor(
    private facade: AuthFacade
  ) {
    super();
    this.observe(this.facade.userRoles$)
      .subscribe(roles => this.userRoles = roles);
  }

  isInRole(...roles: string[]): boolean {
    return roles.some(role => this.userRoles.includes(role));
  }
}
