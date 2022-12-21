import { createAction, props } from '@ngrx/store';
import { FetchUserBankAccountsSuccessProps } from './props/get-user-bank-accounts-success.props';
import { SetSelectedBankAccountIndexProps } from './props/set-selected-bank-account-index.props';

export const BankAccountsActions = {
  fetchUserBankAccounts: createAction(
    '[Bank accounts] Fetch user bank accounts'
  ),
  fetchUserBankAccountsSuccess: createAction(
    '[Bank accounts] Fetch user bank accounts success',
    props<FetchUserBankAccountsSuccessProps>()
  ),
  fetchUserBankAccountsFail: createAction(
    '[Bank accounts] Fetch user bank accounts fail'
  ),
  setSelectedBankAccountIndex: createAction(
    '[Bank accounts] Set selected bank account index',
    props<SetSelectedBankAccountIndexProps>()
  ),
};
