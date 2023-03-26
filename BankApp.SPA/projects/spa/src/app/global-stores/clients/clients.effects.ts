import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthApiClient } from 'projects/api-client/src/clients/auth.api-client';
import {
  catchError,
  map,
  mergeMap,
  of,
  tap
} from 'rxjs';
import { AlertService } from '../../shared/services/alert.service';
import { BankAccountsActions } from '../bank-accounts/bank-accounts.actions';
import { ClientsActions } from './clients.actions';

@Injectable()
export class ClientsEffects {

  fetchClients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientsActions.fetchClients),
      mergeMap(action =>
        this.authApiClient.getClients(action.searchBy).pipe(
          map(result => ClientsActions.fetchClientsSuccess({ clients: result.data })),
          catchError(() => of(ClientsActions.fetchClientsFail()))
        )
      )
    )
  );

  addEntryFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientsActions.fetchClientsFail),
      tap(() => this.alertService.error('error.fetch_clients'))
    ), { dispatch: false }
  );

  setSelectedClientId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientsActions.setSelectedClientId),
      map(() => BankAccountsActions.fetchUserBankAccounts())
    )
  );

  constructor(
    private actions$: Actions,
    private authApiClient: AuthApiClient,
    private alertService: AlertService
  ) {}
}
