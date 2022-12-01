import { createAction, props } from '@ngrx/store';
import { LoginSuccessProps } from './props/login-success.props';
import { LoginProps } from './props/login.props';
import { RegisterProps } from './props/register.props';

export const AuthActions = {
  login: createAction(
    '[Auth] Login',
    props<LoginProps>()
  ),
  loginSuccess: createAction(
    '[Auth] Login success',
    props<LoginSuccessProps>()
  ),
  loginFail: createAction(
    '[Auth] Login fail'
  ),
  register: createAction(
    '[Auth] Register',
    props<RegisterProps>()
  ),
  registerSuccess: createAction(
    '[Auth] Register success'
  ),
  registerFail: createAction(
    '[Auth] Register fail'
  ),
};
