import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TransactionApiClient } from 'projects/api-client/src/clients/transaction.api-client';
import {
  catchError, map, mergeMap, of, tap, withLatestFrom
} from 'rxjs';
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

  //TODO: Replace with api client call and file download
  downloadConfirmation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewTransactionActions.downloadConfirmation),
      withLatestFrom(this.facade.newTransactionId$),
      map(([, id]) => id)
    ), { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private alertService: AlertService,
    private facade: NewTransactionFacade,
    private router: Router,
    private transactionApiClient: TransactionApiClient
  ) {}
}
