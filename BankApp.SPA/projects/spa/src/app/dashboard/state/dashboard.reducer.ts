import { createReducer, on } from '@ngrx/store';
import { DashboardActions } from './dashboard.actions';
import { DashboardState } from './dashboard.state';

const initialState: DashboardState = {
  bankAccounts: null,
};

export const dashboardReducer = createReducer<DashboardState>(
  initialState,
  on(DashboardActions.getUserBankAccountsSuccess, (state, action) => ({
    ...state,
    bankAccounts: action.accounts,
  }))
);
