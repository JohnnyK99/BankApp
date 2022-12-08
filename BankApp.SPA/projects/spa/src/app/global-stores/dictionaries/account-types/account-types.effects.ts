import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DictionariesApiClient } from 'projects/api-client/src/clients/dictionaries.api-client';
import {
  catchError,
  map,
  mergeMap,
  of,
  tap,
  withLatestFrom
} from 'rxjs';
import { AlertService } from '../../../shared/services/alert.service';
import { DictionariesFacade } from '../dictionaries.facade';
import { AccountTypesActions } from './account-types.actions';

@Injectable()
export class AccountTypesEffects {

  getAccountTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountTypesActions.getAccountTypes),
      withLatestFrom(this.dictionariesFacade.accountTypes$),
      mergeMap(([, accountTypes]) => {
        if(accountTypes != null) {
          return of(AccountTypesActions.getAccountTypesSuccess({ accountTypes }));
        }

        return this.dictionariesApiClient.getAccountTypes().pipe(
          map(result => AccountTypesActions.getAccountTypesSuccess({ accountTypes: result.data })),
          catchError(() => of(AccountTypesActions.getAccountTypesFail()))
        );
      })
    )
  );

  getAccountTypesFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountTypesActions.getAccountTypesFail),
      tap(() => this.alertService.error('error.account_types'))
    ), { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private alertService: AlertService,
    private dictionariesApiClient: DictionariesApiClient,
    private dictionariesFacade: DictionariesFacade
  ) {}
}
