import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AddressBookApiClient } from 'projects/api-client/src/clients/address-book-client';
import {
  catchError,
  map,
  mergeMap,
  of,
  tap,
  withLatestFrom
} from 'rxjs';
import { AlertService } from '../../shared/services/alert.service';
import { AddressBookActions } from './address-book.actions';
import { AddressBookFacade } from './address-book.facade';

@Injectable()
export class AddressBookEffects {

  getAddressBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressBookActions.fetchAddressBook),
      withLatestFrom(this.addressBookFacade.addressBook$),
      mergeMap(([, entries]) => {
        if(entries != null) {
          return of(AddressBookActions.fetchAddressBookSuccess({ entries }));
        }

        return this.addressBookApiClient.getAddressBook().pipe(
          map(result => AddressBookActions.fetchAddressBookSuccess({ entries: result.data })),
          catchError(() => of(AddressBookActions.fetchAddressBookFail()))
        );
      })
    )
  );

  getAccountTypesFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressBookActions.fetchAddressBookFail),
      tap(() => this.alertService.error('error.address_book'))
    ), { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private addressBookApiClient: AddressBookApiClient,
    private addressBookFacade: AddressBookFacade,
    private alertService: AlertService
  ) {}
}
