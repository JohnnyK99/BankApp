import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { first, map, Observable } from 'rxjs';
import { AppRoutes } from '../shared/constants/routes/app-routes.constants';
import { AuthFacade } from '../global-stores/auth/auth.facade';
import { UserService } from '../shared/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    private facade: AuthFacade,
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.facade.isTokenValid$
      .pipe(
        first(),
        map(isValid => {
          const url = route.url.toString();

          if([AppRoutes.login, AppRoutes.register].includes(url)) {
            if(isValid) {
              this.redirectToBase();
              return false;
            }

            return true;
          }

          if(isValid === false) {
            this.facade.redirectToLogin(this.getFullPath(route));
            return false;
          }
          if(this.hasValidRole(route.data['roles'] as string[])) {
            return true;
          }

          this.redirectToNoAccess();
          return false;
        })
      );
  }

  private hasValidRole(routeRoles: string[]): boolean {
    if(routeRoles == null || routeRoles.length === 0) {
      return true;
    }

    return this.userService.isInRole(...routeRoles);
  }

  private getFullPath(route: ActivatedRouteSnapshot): string {
    return '/' + route.pathFromRoot.map(r => r.url)
      .filter(f => f.length > 0)
      .map(([f]) => f.path)
      .join('/');
  }

  private redirectToNoAccess(): void {
    this.router.navigate([AppRoutes.noAccess]);
  }

  private redirectToBase(): void {
    this.router.navigate([AppRoutes.base]);
  }
}
