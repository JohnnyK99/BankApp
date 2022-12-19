import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { TransactionApiClient } from 'projects/api-client/src/clients/transaction.api-client';
import {
  mergeMap,
  map,
  catchError,
  of,
  tap
} from 'rxjs';
import { FileHelpers } from '../../shared/helpers/file.helpers';
import { AlertService } from '../../shared/services/alert.service';
import { DashboardActions } from './dashboard.actions';


@Injectable()
export class DashboardEffects {
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
    private transactionApiClient: TransactionApiClient
  ) {}
}
