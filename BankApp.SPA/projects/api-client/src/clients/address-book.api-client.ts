import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressBookEntry } from '../models/address-book/address-book-entry.model';
import { BaseResponse } from '../models/shared/base.response';
import { EmptyResponse } from '../models/shared/empty.response';
import { AddressBookUrlsService } from '../urls/address-book-urls.service';

@Injectable({
  providedIn: 'root',
})
export class AddressBookApiClient {
  constructor(
    private addressBookUrls: AddressBookUrlsService,
    private http: HttpClient
  ) {}

  getAllEntries(): Observable<BaseResponse<AddressBookEntry[]>> {
    return this.http.get<BaseResponse<AddressBookEntry[]>>(this.addressBookUrls.getAllEntries());
  }

  addEntry(entry: AddressBookEntry): EmptyResponse {
    return this.http.post(this.addressBookUrls.addEntry(), entry);
  }

  removeEntry(accountNumber: string): EmptyResponse {
    return this.http.delete(this.addressBookUrls.removeEntry(), { params: { accountNumber } });
  }
}
