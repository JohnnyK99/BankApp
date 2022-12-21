import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TransactionApiClient } from 'projects/api-client/src/clients/transaction.api-client';
import {
  catchError,
  map,
  mergeMap,
  of,
  tap,
  withLatestFrom
} from 'rxjs';
import { AlertService } from '../../../shared/services/alert.service';
import { TransactionsListActions } from './transactions-list.actions';
import { TransactionsListFacade } from './transactions-list.facade';

@Injectable()
export class TransactionsListEffects {

  fetchTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsListActions.fetchTransactions),
      withLatestFrom(this.facade.queryParams$),
      map(([, params]) => params),
      mergeMap(params =>
        this.transactionApiClient.getTransactions(params).pipe(
          map(result => TransactionsListActions.fetchTransactionsSuccess({ transactions: result.data })),
          catchError(() => of(TransactionsListActions.fetchTransactionsFail()))
        )
      )
    )
  );

  fetchTransactionsFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsListActions.fetchTransactionsFail),
      tap(() => {
        this.alertService.error('error.fetch_transactions');
      })
    ), { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private alertService: AlertService,
    private facade: TransactionsListFacade,
    private transactionApiClient: TransactionApiClient
  ) {}
}
