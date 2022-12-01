import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginModel } from 'projects/api-client/src/models/auth/login.model';
import { AuthActions } from './auth.actions';
import { getAccessToken, getAuthStatus, getGuardInfo, getUserInfo } from './auth.selectors';
import { AuthState } from './auth.state';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  guardInfo$ = this.store.select(getGuardInfo);
  authStatus$ = this.store.select(getAuthStatus);
  userInfo$ = this.store.select(getUserInfo);
  accessToken$ = this.store.select(getAccessToken);

  constructor(private store: Store<AuthState>) {}

  login(model: LoginModel): void {
    this.store.dispatch(AuthActions.login({ ...model }));
  }
}
