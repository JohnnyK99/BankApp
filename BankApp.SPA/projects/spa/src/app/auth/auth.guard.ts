import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { first, map, Observable } from 'rxjs';
import { AppRoutes } from '../app-routes.constants';
import { AuthFacade } from '../global-stores/auth/auth.facade';
import { LocalStorageHelpers } from '../shared/helpers/local-storage.helpers';
import { AuthGuardModel } from '../shared/models/auth-guard.model';
import { UserService } from '../shared/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private facade: AuthFacade,
    private userService: UserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.facade.guardInfo$
      .pipe(
        first(),
        map((model: AuthGuardModel) => {
          if(!model.token || !model.exp || model.exp < Date.now()) {
            this.redirectToLogin(route.url.toString());
            return false;
          }
          return route.data['roles'] == null || this.userService.isInRole(...route.data['roles'] as string[]);
        })
      );
  }

  private redirectToLogin(targetUrl: string): void {
    LocalStorageHelpers.setLoginTargetUrl(targetUrl);
    this.router.navigate([AppRoutes.login]);
  }
}
