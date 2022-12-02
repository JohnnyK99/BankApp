import { createReducer, on } from '@ngrx/store';
import { AuthStatus } from '../../shared/constants/enums/auth-status.enum';
import { AuthHelpers } from '../../shared/helpers/auth.helpers';
import { LocalStorageHelpers } from '../../shared/helpers/local-storage.helpers';
import { AuthActions } from './auth.actions';
import { AuthState } from './auth.state';

const initialState: AuthState = {
  accessToken: LocalStorageHelpers.getAccessToken(),
  accessTokenExp: AuthHelpers.getAccessTokenExp(LocalStorageHelpers.getAccessToken()),
  username: AuthHelpers.getUserName(LocalStorageHelpers.getAccessToken()),
  userRoles: AuthHelpers.getUserRoles(LocalStorageHelpers.getAccessToken()),
  status: AuthStatus.LoggedOut,
};

export const authReducer = createReducer<AuthState>(
  initialState,
  on(AuthActions.login, state => ({
    ...state,
    status: AuthStatus.Authenticating,
  })),
  on(AuthActions.loginSuccess, (state, action) => ({
    ...state,
    accessToken: action.model.accessToken,
    accessTokenExp: AuthHelpers.getAccessTokenExp(action.model.accessToken),
    username: AuthHelpers.getUserName(action.model.accessToken),
    userRoles: AuthHelpers.getUserRoles(action.model.accessToken),
    status: AuthStatus.Authenticated,
  })),
  on(AuthActions.loginFail, state => ({
    ...state,
    status: AuthStatus.ErrorLogin,
  })),
  on(AuthActions.register, state => ({
    ...state,
    status: AuthStatus.Registering,
  })),
  on(AuthActions.registerFail, state => ({
    ...state,
    status: AuthStatus.ErrorRegister,
  }))
);
