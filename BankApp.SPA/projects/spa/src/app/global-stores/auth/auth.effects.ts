import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthApiClient } from 'projects/api-client/src/clients/auth.api-client';
import {
  catchError,
  map,
  mergeMap,
  of,
  tap
} from 'rxjs';
import { AppRoutes } from '../../app-routes.constants';
import { LocalStorageHelpers } from '../../shared/helpers/local-storage.helpers';
import { AlertService } from '../../shared/services/alert.service';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(action =>
        this.authApiClient.login({ email: action.email, password: action.password }).pipe(
          map(resp => AuthActions.loginSuccess({ model: resp.data })),
          catchError(() => of(AuthActions.loginFail()))
        )
      )
    ));

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => {
        const targetUrl = LocalStorageHelpers.getLoginTargetUrl();
        LocalStorageHelpers.removeLoginTargetUrl();
        this.router.navigate([targetUrl]);
      })
    ), { dispatch: false });

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(action =>
        this.authApiClient.register(action.model).pipe(
          map(() => AuthActions.registerSuccess()),
          catchError(() => of(AuthActions.registerFail()))
        )
      )
    ));

  registerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerSuccess),
      tap(() => {
        this.alertService.success('success.register');
        this.router.navigate([AppRoutes.login]);
      })
    ), { dispatch: false });

  registerFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerFail),
      tap(() => this.alertService.error('error.register'))
    ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private alertService: AlertService,
    private authApiClient: AuthApiClient,
    private router: Router
  ) {}
}
