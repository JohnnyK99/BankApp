import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureState } from '../../shared/constants/enums/feature-state.enum';
import { AuthGuardModel } from '../../shared/models/auth-guard.model';
import { AuthState } from './auth.state';

const getAuthState = createFeatureSelector<AuthState>(FeatureState.Auth);

export const getAuthStatus = createSelector(
  getAuthState,
  state => state.status
);

export const getGuardInfo = createSelector(
  getAuthState,
  state => ({
    token: state.accessToken,
    exp: state.accessTokenExp,
  } as AuthGuardModel)
);
