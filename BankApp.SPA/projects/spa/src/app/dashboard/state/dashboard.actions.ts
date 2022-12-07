import { createAction, props } from '@ngrx/store';
import { GetUserBankAccountsSuccessProps } from './props/get-user-bank-accounts-success.props';

export const DashboardActions = {
  getUserBankAccounts: createAction(
    '[Dashboard] Get user bank accounts'
  ),
  getUserBankAccountsSuccess: createAction(
    '[Dashboard] Get user bank accounts success',
    props<GetUserBankAccountsSuccessProps>()
  ),
  getUserBankAccountsFail: createAction(
    '[Dashboard] Get user bank accounts fail'
  ),
};
