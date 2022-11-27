import { createReducer, on } from '@ngrx/store';
import { AuthStatus } from '../../shared/constants/enums/auth-status.enum';
import { AuthHelpers } from '../../shared/helpers/auth.helpers';
import { LocalStorageHelpers } from '../../shared/helpers/local-storage.helpers';
import { AuthActions } from './auth.actions';
import { AuthState } from './auth.state';

const initialState: AuthState = {
  accessToken: LocalStorageHelpers.getAccessToken(),
  accessTokenExp: AuthHelpers.getAccessTokenExp(LocalStorageHelpers.getAccessToken()),
  status: AuthHelpers.getInitialStatus(LocalStorageHelpers.getAccessToken()),
};

export const authReducer = createReducer<AuthState>(
  initialState,
  on(AuthActions.login, state => ({
    ...state,
    status: AuthStatus.Authenticating,
  })),
  on(AuthActions.loginSuccess, (state, action) => ({
    ...state,
    accessToken: action.accessToken,
    accessTokenExp: Date.now() + 100000,
    status: AuthStatus.Authenticated,
  })),
  on(AuthActions.loginFail, state => ({
    ...state,
    status: AuthStatus.Error,
  }))
);