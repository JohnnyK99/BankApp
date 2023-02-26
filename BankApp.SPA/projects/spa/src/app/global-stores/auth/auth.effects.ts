import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthApiClient } from 'projects/api-client/src/clients/auth.api-client';
import {
  catchError,
  map,
  mergeMap,
  of,
  tap,
  withLatestFrom
} from 'rxjs';
import { AppRoutes } from '../../app-routes.constants';
import { AuthConstants } from '../../shared/constants/auth.constants';
import { AuthHelpers } from '../../shared/helpers/auth.helpers';
import { LocalStorageHelpers } from '../../shared/helpers/local-storage.helpers';
import { AlertService } from '../../shared/services/alert.service';
import { AuthActions } from './auth.actions';
import { AuthFacade } from './auth.facade';

@Injectable()
export class AuthEffects {

  redirectToLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.redirectToLogin),
      tap(action => {
        if(AuthConstants.redirectUrlsToIgnore.some(url => !action.targetUrl.includes(url))) {
          LocalStorageHelpers.setLoginTargetUrl(action.targetUrl);
        }

        this.router.navigate([AppRoutes.login]);
      })
    ), { dispatch: false });

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
      tap((action) => {
        const targetUrl = LocalStorageHelpers.getLoginTargetUrl();
        LocalStorageHelpers.removeLoginTargetUrl();
        AuthHelpers.setLocalStorageValues(action.model.accessToken, action.model.refreshToken, action.model.refreshTokenExp);
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

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        AuthHelpers.removeLocalStorageValues();
        this.router.navigate([AppRoutes.login]);
      })
    ), { dispatch: false });

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      withLatestFrom(this.facade.refreshInfo$),
      map(([, refreshInfo]) => refreshInfo),
      mergeMap(refreshInfo => {
        if(!refreshInfo.accessToken || !refreshInfo.refreshToken || !refreshInfo.refreshTokenExp || AuthHelpers.isTokenExpired(refreshInfo.refreshTokenExp)) {
          return of(AuthActions.refreshTokenFail());
        }

        return this.authApiClient.refreshToken({ accessToken: refreshInfo.accessToken, refreshToken: refreshInfo.refreshToken }).pipe(
          map(resp => AuthActions.refreshTokenSuccess({ model: resp.data })),
          catchError(() => of(AuthActions.refreshTokenFail()))
        );
      })
    ));

  refreshTokenSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshTokenSuccess),
      tap((action) => AuthHelpers.setLocalStorageValues(action.model.accessToken, action.model.refreshToken, action.model.refreshTokenExp))
    ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private alertService: AlertService,
    private authApiClient: AuthApiClient,
    private facade: AuthFacade,
    private router: Router
  ) {}
}
