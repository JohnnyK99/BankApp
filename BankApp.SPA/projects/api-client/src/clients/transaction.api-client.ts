import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mapBlobResponseToFile } from '../helpers/map.helpers';
import { BaseResponse } from '../models/shared/base.response';
import { NewTransaction } from '../models/transactions/new-transaction.model';
import { TransactionsUrlsService } from '../urls/transactions-urls.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionApiClient {
  constructor(
    private transactionUrls: TransactionsUrlsService,
    private http: HttpClient
  ) {}

  createTransaction(transaction: NewTransaction): Observable<BaseResponse<number>> {
    return this.http.post<BaseResponse<number>>(this.transactionUrls.createTransaction(), transaction);
  }

  getConfirmation(transactionId: number): Observable<File> {
    return this.http.get(this.transactionUrls.getConfirmation(transactionId), { observe: 'response', responseType: 'blob' })
      .pipe(mapBlobResponseToFile('potwierdzenie transakcji'));
  }
}
