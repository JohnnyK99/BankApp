import { createReducer, on } from '@ngrx/store';
import { AuthStatus } from '../../shared/constants/enums/auth-status.enum';
import { AuthHelpers } from '../../shared/helpers/auth.helpers';
import { LocalStorageHelpers } from '../../shared/helpers/local-storage.helpers';
import { AuthActions } from './auth.actions';
import { AuthState } from './auth.state';

const initialState: AuthState = {
  accessToken: LocalStorageHelpers.getAccessToken(),
  accessTokenExp: AuthHelpers.getAccessTokenExp(LocalStorageHelpers.getAccessToken()),
  refreshToken: LocalStorageHelpers.getRefreshToken(),
  refreshTokenExp: LocalStorageHelpers.getRefreshTokenExp(),
  username: AuthHelpers.getUserName(LocalStorageHelpers.getAccessToken()),
  userRoles: AuthHelpers.getUserRoles(LocalStorageHelpers.getAccessToken()),
  status: AuthHelpers.getInitialStatus(),
};

export const authReducer = createReducer<AuthState>(
  initialState,
  on(AuthActions.login, state => ({
    ...state,
    status: AuthStatus.Authenticating,
  })),
  on(AuthActions.loginSuccess, AuthActions.refreshTokenSuccess, (state, action): AuthState => ({
    ...state,
    accessToken: action.model.accessToken,
    accessTokenExp: AuthHelpers.getAccessTokenExp(action.model.accessToken),
    refreshToken: action.model.refreshToken,
    refreshTokenExp: action.model.refreshTokenExp,
    username: AuthHelpers.getUserName(action.model.accessToken),
    userRoles: AuthHelpers.getUserRoles(action.model.accessToken),
    status: AuthStatus.Authenticated,
  })),
  on(AuthActions.loginFail, (state): AuthState => ({
    ...state,
    status: AuthStatus.ErrorLogin,
  })),
  on(AuthActions.register, (state): AuthState => ({
    ...state,
    status: AuthStatus.Registering,
  })),
  on(AuthActions.registerSuccess, (state): AuthState => ({
    ...state,
    status: AuthStatus.LoggedOut,
  })),
  on(AuthActions.registerFail, (state): AuthState => ({
    ...state,
    status: AuthStatus.ErrorRegister,
  })),
  on(AuthActions.logout, (): AuthState => ({
    accessToken: null,
    accessTokenExp: null,
    refreshToken: null,
    refreshTokenExp: null,
    username: '',
    userRoles: [],
    status: AuthStatus.LoggedOut,
  }))
);
