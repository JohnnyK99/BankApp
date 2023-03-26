import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BankAccountApiClient } from 'projects/api-client/src/clients/account.api-client';
import {
  catchError,
  map,
  mergeMap,
  of,
  tap,
  withLatestFrom
} from 'rxjs';
import { AlertService } from '../../shared/services/alert.service';
import { ClientsFacade } from '../clients/clients.facade';
import { BankAccountsActions } from './bank-accounts.actions';

@Injectable()
export class BankAccountsEffects {

  getUserBankAccounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BankAccountsActions.fetchUserBankAccounts),
      withLatestFrom(this.clientsFacade.selectedClientId$),
      map(([, id]) => id),
      mergeMap(id =>
        this.bankAccountApiClient.getUserBankAccounts(id ?? undefined).pipe(
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
      withLatestFrom(this.clientsFacade.selectedClientId$),
      mergeMap(([action, clientId]) =>
        this.bankAccountApiClient.createBankAccount(action.accountTypeId, clientId).pipe(
          map(() => BankAccountsActions.createBankAccountSuccess()),
          catchError(() => of(BankAccountsActions.createBankAccountFail()))
        )
      )
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
    private bankAccountApiClient: BankAccountApiClient,
    private clientsFacade: ClientsFacade
  ) {}
}
