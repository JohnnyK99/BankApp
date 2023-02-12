import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TransactionApiClient } from 'projects/api-client/src/clients/transaction.api-client';
import { TransactionsQueryParams } from 'projects/api-client/src/models/transactions/transactions-query-params.model';
import {
  catchError,
  EMPTY,
  map,
  mergeMap,
  of,
  tap,
  withLatestFrom
} from 'rxjs';
import { FileHelpers } from '../../shared/helpers/file.helpers';
import { AlertService } from '../../shared/services/alert.service';
import { TransactionsActions } from './transactions.actions';
import { TransactionsFacade } from './transactions.facade';

@Injectable()
export class TransactionsEffects {

  createTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.createTransaction),
      mergeMap(action =>
        this.transactionApiClient.createTransaction(action.transaction).pipe(
          map(result => TransactionsActions.createTransactionSuccess({ transactionId: result.data })),
          catchError(() => of(TransactionsActions.createTransactionFail()))
        )
      )
    )
  );

  createTransactionSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.createTransactionSuccess),
      tap(() => {
        this.router.navigate(['transactions/success']);
      })
    ), { dispatch: false }
  );

  createTransactionFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.createTransactionFail),
      tap(() => {
        this.alertService.error('error.create_transaction');
      })
    ), { dispatch: false }
  );

  downloadNewConfirmation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.downloadNewConfirmation),
      withLatestFrom(this.facade.newTransactionId$),
      map(([, id]) => id),
      mergeMap(id => {
        if(!id) {
          return EMPTY;
        }

        return of(TransactionsActions.downloadConfirmation({ transactionId: id }));
      })
    )
  );

  downloadConfirmation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.downloadConfirmation),
      mergeMap(action =>
        this.transactionApiClient.getConfirmation(action.transactionId).pipe(
          map(confirmation => TransactionsActions.downloadConfirmationSuccess({ confirmation })),
          catchError(() => of(TransactionsActions.downloadConfirmationFail()))
        ))
    ));

  downloadConfirmationSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.downloadConfirmationSuccess),
      tap(action => FileHelpers.downloadFile(action.confirmation))
    ), { dispatch: false });

  downloadConfirmationFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.downloadConfirmationFail),
      tap(() => this.alertService.error('error.download_file'))
    ), { dispatch: false });

  fetchTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.fetchTransactions),
      withLatestFrom(this.facade.queryParams$),
      map(([, params]) => params),
      mergeMap(params => {
        if(this.shouldClearTransactions(params)) {
          return of(TransactionsActions.clearTransactions());
        }

        return this.transactionApiClient.getTransactions(params).pipe(
          map(result => TransactionsActions.fetchTransactionsSuccess({ transactions: result.data })),
          catchError(() => of(TransactionsActions.fetchTransactionsFail()))
        );
      })
    )
  );

  fetchTransactionsFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.fetchTransactionsFail),
      tap(() => {
        this.alertService.error('error.fetch_transactions');
      })
    ), { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private alertService: AlertService,
    private facade: TransactionsFacade,
    private router: Router,
    private transactionApiClient: TransactionApiClient
  ) {}

  private shouldClearTransactions(params: TransactionsQueryParams): boolean {
    return params.bankAccountNumber == null;
  }
}
