import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureState } from '../../shared/constants/enums/feature-state.enum';
import { AuthGuardModel } from '../../shared/models/auth-guard.model';
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
