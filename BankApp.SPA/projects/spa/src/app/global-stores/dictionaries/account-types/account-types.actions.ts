import { createAction, props } from '@ngrx/store';
import { GetAccountTypesSuccessProps } from './props/get-account-types-success.props';

export const AccountTypesActions = {
  getAccountTypes: createAction(
    '[Dict] Get account types'
  ),
  getAccountTypesSuccess: createAction(
    '[Dict] Get account types success',
    props<GetAccountTypesSuccessProps>()
  ),
  getAccountTypesFail: createAction(
    '[Dict] Get account types fail'
  ),
};
