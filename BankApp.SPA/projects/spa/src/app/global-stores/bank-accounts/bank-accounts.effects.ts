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
import { BankAccountsActions } from './bank-accounts.actions';

@Injectable()
export class BankAccountsEffects {

  getUserBankAccounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BankAccountsActions.fetchUserBankAccounts),
      mergeMap(() =>
        this.bankAccountApiClient.getUserBankAccounts().pipe(
          map(result => BankAccountsActions.fetchUserBankAccountsSuccess({ bankAccounts: result.data })),
          catchError(() => of(BankAccountsActions.fetchUserBankAccountsFail()))
        )
      )
    )
  );

  getUserBankAccountsFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BankAccountsActions.fetchUserBankAccountsFail),
      tap(() => this.alertService.error('error.bank_accounts'))
    ), { dispatch: false }
  );

  createBankAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BankAccountsActions.createBankAccount),
      mergeMap(action =>
        this.bankAccountApiClient.createBankAccount(action.accountTypeId).pipe(
          map(() => BankAccountsActions.createBankAccountSuccess()),
          catchError(() => of(BankAccountsActions.createBankAccountFail()))
        ))
    )
  );

  createBankAccountSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BankAccountsActions.createBankAccountSuccess),
      map(() => {
        this.alertService.success('success.create_bank_account');
        return BankAccountsActions.fetchUserBankAccounts();
      })
    )
  );

  createBankAccountFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BankAccountsActions.createBankAccountFail),
      tap(() => this.alertService.error('error.create_bank_account'))
    ), { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private alertService: AlertService,
    private bankAccountApiClient: BankAccountApiClient
  ) {}
}
