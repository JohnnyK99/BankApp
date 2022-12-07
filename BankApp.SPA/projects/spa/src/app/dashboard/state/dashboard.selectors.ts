import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureState } from '../../shared/constants/enums/feature-state.enum';
import { DashboardState } from './dashboard.state';

const getDashboardState = createFeatureSelector<DashboardState>(FeatureState.Dashboard);

export const getUserBankAccounts = createSelector(
  getDashboardState,
  state => state.bankAccounts
);
