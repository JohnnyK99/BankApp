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
  getGuardInfo,
  getInterceptorInfo,
  getRefreshInfo,
  getUserInfo
} from './auth.selectors';
import { AuthState } from './auth.state';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  guardInfo$ = this.store.select(getGuardInfo);
  interceptorInfo$ = this.store.select(getInterceptorInfo);
  refreshInfo$ = this.store.select(getRefreshInfo);
  authStatus$ = this.store.select(getAuthStatus);
  userInfo$ = this.store.select(getUserInfo);
  accessToken$ = this.store.select(getAccessToken);
  accessTokenExp$ = this.store.select(getAccessTokenExp);

  private tokenRefreshTimer: Subscription | null = null;

  constructor(private store: Store<AuthState>) {
    this.initTokenRefresh();
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

        if(timeToExpiry < AuthConstants.timeToRefreshAccessToken) {
          this.store.dispatch(AuthActions.refreshToken());
          return;
        }

        this.startTokenRefreshTimer(timeToExpiry - AuthConstants.timeToRefreshAccessToken);
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
