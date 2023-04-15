import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { TransactionApiClient } from 'projects/api-client/src/clients/transaction.api-client';
import {
  mergeMap,
  map,
  catchError,
  of,
  tap,
  withLatestFrom
} from 'rxjs';
import { FileHelpers } from '../../shared/helpers/file.helpers';
import { AlertService } from '../../shared/services/alert.service';
import { DashboardActions } from './dashboard.actions';
import { ClientsFacade } from '../../global-stores/clients/clients.facade';
import { UserService } from '../../shared/services/user.service';
import { UserRoles } from '../../shared/constants/enums/user-roles.enum';
import { BankAccountsActions } from '../../global-stores/bank-accounts/bank-accounts.actions';


@Injectable()
export class DashboardEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.init),
      withLatestFrom(this.clientsFacade.selectedClientId$),
      map(([, clientId]) => {
        if(this.userService.isInRole(UserRoles.Client) || clientId != null) {
          return BankAccountsActions.fetchUserBankAccounts();
        }

        return BankAccountsActions.clearUserBankAccounts();
      })
    ));

  downloadConfirmation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.downloadConfirmation),
      mergeMap(action =>
        this.transactionApiClient.getConfirmation(action.transactionId).pipe(
          map(confirmation => DashboardActions.downloadConfirmationSuccess({ confirmation })),
          catchError(() => of(DashboardActions.downloadConfirmationFail()))
        )
      )
    )
  );

  downloadConfirmationSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.downloadConfirmationSuccess),
      tap(action => FileHelpers.downloadFile(action.confirmation))
    ), { dispatch: false });

  downloadConfirmationFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.downloadConfirmationFail),
      tap(() => this.alertService.error('error.download_file'))
    ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private alertService: AlertService,
    private clientsFacade: ClientsFacade,
    private transactionApiClient: TransactionApiClient,
    private userService: UserService
  ) {}
}
