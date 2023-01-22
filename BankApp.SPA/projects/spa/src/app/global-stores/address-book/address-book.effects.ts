import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AddressBookApiClient } from 'projects/api-client/src/clients/address-book.api-client';
import {
  catchError,
  map,
  mergeMap,
  of,
  tap
} from 'rxjs';
import { AlertService } from '../../shared/services/alert.service';
import { AddressBookActions } from './address-book.actions';

@Injectable()
export class AddressBookEffects {

  fetchAddressBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressBookActions.fetchAddressBook),
      mergeMap(() => {
        return this.addressBookApiClient.getAllEntries().pipe(
          map(result => AddressBookActions.fetchAddressBookSuccess({ entries: result.data })),
          catchError(() => of(AddressBookActions.fetchAddressBookFail()))
        );
      })
    )
  );

  fetchAddressBookFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressBookActions.fetchAddressBookFail),
      tap(() => this.alertService.error('error.address_book'))
    ), { dispatch: false }
  );

  addEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressBookActions.addEntry),
      mergeMap(action =>
        this.addressBookApiClient.addEntry(action.entry).pipe(
          map(() => AddressBookActions.addEntrySuccess()),
          catchError(() => of(AddressBookActions.addEntryFail()))
        ))
    )
  );

  addEntrySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressBookActions.addEntrySuccess),
      map(() => {
        this.alertService.success('success.add_address_book_entry');
        return AddressBookActions.fetchAddressBook();
      })
    )
  );

  addEntryFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressBookActions.addEntryFail),
      tap(() => this.alertService.error('error.add_address_book_entry'))
    ), { dispatch: false }
  );

  removeEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressBookActions.removeEntry),
      mergeMap(action =>
        this.addressBookApiClient.removeEntry(action.accountNumber).pipe(
          map(() => AddressBookActions.removeEntrySuccess()),
          catchError(() => of(AddressBookActions.removeEntryFail()))
        ))
    )
  );

  removeEntrySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressBookActions.removeEntrySuccess),
      map(() => {
        this.alertService.success('success.remove_address_book_entry');
        return AddressBookActions.fetchAddressBook();
      })
    )
  );

  removeEntryFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressBookActions.removeEntryFail),
      tap(() => this.alertService.error('error.remove_address_book_entry'))
    ), { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private addressBookApiClient: AddressBookApiClient,
    private alertService: AlertService
  ) {}
}
