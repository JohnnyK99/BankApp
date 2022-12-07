import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BankAccountApiClient } from 'projects/api-client/src/clients/account.api-client';
import {
  catchError,
  map,
  mergeMap,
  of,
  tap
} from 'rxjs';
import { AlertService } from '../../shared/services/alert.service';
import { DashboardActions } from './dashboard.actions';

@Injectable()
export class DashboardEffects {

  getUserBankAccounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.getUserBankAccounts),
      mergeMap(() =>
        this.bankAccountApiClient.getUserBankAccounts().pipe(
          map(result => DashboardActions.getUserBankAccountsSuccess({ accounts: result.data })),
          catchError(() => of(DashboardActions.getUserBankAccountsFail()))
        )
      )
    )
  );

  getUserBankAccountsFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.getUserBankAccountsFail),
      tap(() => this.alertService.error('error.bank_accounts'))
    ), { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private alertService: AlertService,
    private bankAccountApiClient: BankAccountApiClient
  ) {}
}
