import { createAction, props } from '@ngrx/store';
import { CreateBankAccountProps } from './props/create-bank-account.props';
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
  clearUserBankAccounts: createAction(
    '[Bank accounts] Clear user bank accounts'
  ),
  setSelectedBankAccountIndex: createAction(
    '[Bank accounts] Set selected bank account index',
    props<SetSelectedBankAccountIndexProps>()
  ),
  createBankAccount: createAction(
    '[Bank accounts] Create bank account',
    props<CreateBankAccountProps>()
  ),
  createBankAccountSuccess: createAction(
    '[Bank accounts] Create bank account success'
  ),
  createBankAccountFail: createAction(
    '[Bank accounts] Create bank account fail'
  ),
};
