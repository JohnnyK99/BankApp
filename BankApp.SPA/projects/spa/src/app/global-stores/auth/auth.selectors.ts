import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureState } from '../../shared/constants/enums/feature-state.enum';
import { AuthHelpers } from '../../shared/helpers/auth.helpers';
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

export const isTokenValid = createSelector(
  getAccessTokenExp,
  exp => exp != null && !AuthHelpers.isTokenExpired(exp)
);

export const getInterceptorInfo = createSelector(
  getAuthState,
  isTokenValid,
  (state, isValid) => ({
    accessToken: state.accessToken,
    isTokenValid: isValid,
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
