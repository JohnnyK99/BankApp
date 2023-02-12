import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureState } from '../../shared/constants/enums/feature-state.enum';
import { AuthGuardModel } from '../../shared/models/auth-guard.model';
import { AuthInterceptorModel } from '../../shared/models/auth-interceptor.model';
import { AuthRefreshModel } from '../../shared/models/auth-refresh.model';
import { AuthState } from './auth.state';

export interface UserModel {
  username: string;
  userRoles: string[];
}

const getAuthState = createFeatureSelector<AuthState>(FeatureState.Auth);

export const getAuthStatus = createSelector(
  getAuthState,
  state => state.status
);

export const getAccessToken = createSelector(
  getAuthState,
  state => state.accessToken
);

export const getAccessTokenExp = createSelector(
  getAuthState,
  state => state.accessTokenExp
);

export const getUserRoles = createSelector(
  getAuthState,
  state => state.userRoles
);

export const getUserInfo = createSelector(
  getAuthState,
  state => ({
    username: state.username,
    userRoles: state.userRoles,
  } as UserModel)
);

export const getGuardInfo = createSelector(
  getAuthState,
  state => ({
    token: state.accessToken,
    exp: state.accessTokenExp,
  } as AuthGuardModel)
);

export const getInterceptorInfo = createSelector(
  getAuthState,
  state => ({
    accessToken: state.accessToken,
    accessTokenExp: state.accessTokenExp,
  } as AuthInterceptorModel)
);

export const getRefreshInfo = createSelector(
  getAuthState,
  state => ({
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
    refreshTokenExp: state.refreshTokenExp,
  } as AuthRefreshModel)
);
