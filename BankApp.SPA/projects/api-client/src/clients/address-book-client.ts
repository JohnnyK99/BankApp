import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AddressBookEntry } from '../models/address-book/address-book-entry.model';
import { BaseResponse } from '../models/shared/base.response';

@Injectable({
  providedIn: 'root',
})
export class AddressBookApiClient {
  private addressBook: AddressBookEntry[] = [
    { id: 1, name: 'Moje konto oszczędnościowe', accountNumber: '48254910320000000000000001' },
    { id: 2, name: 'Moje konto standardowe', accountNumber: '48254910320000000000000002' },
    { id: 3, name: 'Moje konto dla młodych', accountNumber: '48254910320000000000000004' },
  ];

  constructor(
    private http: HttpClient
  ) {}

  //TODO: Replace with api call
  getAddressBook(): Observable<BaseResponse<AddressBookEntry[]>> {
    return of({
      succeeded: true,
      messages: [],
      data: this.addressBook,
    });
  }
}
