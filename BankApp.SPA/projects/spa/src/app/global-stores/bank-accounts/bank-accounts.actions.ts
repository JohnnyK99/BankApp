import { createAction, props } from '@ngrx/store';
import { FetchUserBankAccountsSuccessProps } from './props/get-user-bank-accounts-success.props';

export const BankAccountsActions = {
  fetchUserBankAccounts: createAction(
    '[Dashboard] Fetch user bank accounts'
  ),
  fetchUserBankAccountsSuccess: createAction(
    '[Dashboard] Fetch user bank accounts success',
    props<FetchUserBankAccountsSuccessProps>()
  ),
  fetchUserBankAccountsFail: createAction(
    '[Dashboard] Fetch user bank accounts fail'
  ),
};
