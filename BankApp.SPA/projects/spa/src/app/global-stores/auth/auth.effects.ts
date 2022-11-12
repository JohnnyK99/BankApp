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
import { LocalStorageHelpers } from '../../shared/helpers/local-storage.helpers';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(action =>
        this.authApiClient.login({ idNumber: action.idNumber, password: action.password }).pipe(
          map(resp => AuthActions.loginSuccess({ ...resp })),
          catchError(() => of(AuthActions.loginFail()))
        )
      )
    );
  });

  loginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap((action) => {
        LocalStorageHelpers.setAccessToken(action.accessToken);
        const targetUrl = LocalStorageHelpers.getLoginTargetUrl();
        console.log('target: ' + targetUrl);
        LocalStorageHelpers.removeLoginTargetUrl();
        this.router.navigate([targetUrl]);
      })
    );
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private authApiClient: AuthApiClient,
    private router: Router
  ) {}
}
