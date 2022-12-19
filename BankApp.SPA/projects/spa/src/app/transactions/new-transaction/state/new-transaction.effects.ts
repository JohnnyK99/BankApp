import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TransactionApiClient } from 'projects/api-client/src/clients/transaction.api-client';
import {
  catchError,
  EMPTY,
  map,
  mergeMap,
  of,
  tap,
  withLatestFrom
} from 'rxjs';
import { FileHelpers } from '../../../shared/helpers/file.helpers';
import { AlertService } from '../../../shared/services/alert.service';
import { NewTransactionActions } from './new-transaction.actions';
import { NewTransactionFacade } from './new-transaction.facade';

@Injectable()
export class NewTransactionEffects {

  createTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewTransactionActions.createTransaction),
      mergeMap(action =>
        this.transactionApiClient.createTransaction(action.transaction).pipe(
          map(result => NewTransactionActions.createTransactionSuccess({ transactionId: result.data })),
          catchError(() => of(NewTransactionActions.createTransactionFail()))
        )
      )
    )
  );

  createTransactionSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewTransactionActions.createTransactionSuccess),
      tap(() => {
        this.router.navigate(['transactions/success']);
      })
    ), { dispatch: false }
  );

  createTransactionFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewTransactionActions.createTransactionFail),
      tap(() => {
        this.alertService.error('error.create_transaction');
      })
    ), { dispatch: false }
  );

  downloadConfirmation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewTransactionActions.downloadConfirmation),
      withLatestFrom(this.facade.newTransactionId$),
      map(([, id]) => id),
      mergeMap(id => {
        if(!id) {
          return EMPTY;
        }

        return this.transactionApiClient.getConfirmation(id).pipe(
          map(confirmation => NewTransactionActions.downloadConfirmationSuccess({ confirmation })),
          catchError(() => of(NewTransactionActions.downloadConfirmationFail()))
        );
      })
    )
  );

  downloadConfirmationSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewTransactionActions.downloadConfirmationSuccess),
      tap(action => FileHelpers.downloadFile(action.confirmation))
    ), { dispatch: false });

  downloadConfirmationFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewTransactionActions.downloadConfirmationFail),
      tap(() => this.alertService.error('error.download_file'))
    ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private alertService: AlertService,
    private facade: NewTransactionFacade,
    private router: Router,
    private transactionApiClient: TransactionApiClient
  ) {}
}
