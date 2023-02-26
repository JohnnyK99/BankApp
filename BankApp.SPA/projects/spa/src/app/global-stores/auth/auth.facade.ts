import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginModel } from 'projects/api-client/src/models/auth/login.model';
import { RegistrationModel } from 'projects/api-client/src/models/auth/registration.model';
import { filter, Subscription, timer } from 'rxjs';
import { AuthConstants } from '../../shared/constants/auth.constants';
import { AuthActions } from './auth.actions';
import {
  getAccessToken,
  getAccessTokenExp,
  getAuthStatus,
  getInterceptorInfo,
  getRefreshInfo,
  getUserInfo,
  getUserRoles,
  isTokenValid
} from './auth.selectors';
import { AuthState } from './auth.state';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  isTokenValid$ = this.store.select(isTokenValid);
  interceptorInfo$ = this.store.select(getInterceptorInfo);
  refreshInfo$ = this.store.select(getRefreshInfo);
  authStatus$ = this.store.select(getAuthStatus);
  userInfo$ = this.store.select(getUserInfo);
  userRoles$ = this.store.select(getUserRoles);
  accessToken$ = this.store.select(getAccessToken);
  accessTokenExp$ = this.store.select(getAccessTokenExp);

  private tokenRefreshTimer: Subscription | null = null;

  constructor(private store: Store<AuthState>) {
    this.initTokenRefresh();
  }

  redirectToLogin(targetUrl: string): void {
    this.store.dispatch(AuthActions.redirectToLogin({ targetUrl }));
  }

  login(model: LoginModel): void {
    this.store.dispatch(AuthActions.login({ ...model }));
  }

  register(model: RegistrationModel): void {
    this.store.dispatch(AuthActions.register({ model }));
  }

  logout(): void {
    this.stopTokenRefreshTimer();
    this.store.dispatch(AuthActions.logout());
  }

  private initTokenRefresh(): void {
    this.accessTokenExp$
      .pipe(filter(Boolean))
      .subscribe(exp => {
        const timeToExpiry = exp - Date.now();
        if(timeToExpiry < 0) {
          return;
        }

        const timeToRefresh = timeToExpiry - AuthConstants.timeToRefreshAccessToken;

        if(timeToRefresh < 0) { //token is valid, but expires sooner than timeToRefreshAccessToken
          this.store.dispatch(AuthActions.refreshToken());
          return;
        }

        this.startTokenRefreshTimer(timeToRefresh);
      });
  }

  private startTokenRefreshTimer(timeToRefresh: number): void {
    this.stopTokenRefreshTimer();

    this.tokenRefreshTimer = timer(timeToRefresh)
      .subscribe(() => this.store.dispatch(AuthActions.refreshToken()));
  }

  private stopTokenRefreshTimer(): void {
    if(!this.tokenRefreshTimer) {
      return;
    }

    this.tokenRefreshTimer.unsubscribe();
    this.tokenRefreshTimer = null;
  }
}
