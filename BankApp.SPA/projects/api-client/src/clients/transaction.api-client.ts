import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHelpers } from '../helpers/http.helpers';
import { mapBlobResponseToFile } from '../helpers/map.helpers';
import { BaseResponse } from '../models/shared/base.response';
import { NewTransaction } from '../models/transactions/new-transaction.model';
import { TransactionsQueryParams } from '../models/transactions/transactions-query-params.model';
import { TransactionsResponse } from '../models/transactions/transactions.response';
import { TransactionsUrlsService } from '../urls/transactions-urls.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionApiClient {
  constructor(
    private transactionUrls: TransactionsUrlsService,
    private http: HttpClient
  ) {}

  getTransactions(params: TransactionsQueryParams): Observable<TransactionsResponse> {
    return this.http.get<TransactionsResponse>(this.transactionUrls.getTransactions(), { params: HttpHelpers.getQueryStringParams(params) });
  }

  createTransaction(transaction: NewTransaction): Observable<BaseResponse<number>> {
    return this.http.post<BaseResponse<number>>(this.transactionUrls.createTransaction(), transaction);
  }

  getConfirmation(transactionId: number): Observable<File> {
    return this.http.get(this.transactionUrls.getConfirmation(transactionId), { observe: 'response', responseType: 'blob' })
      .pipe(mapBlobResponseToFile('potwierdzenie transakcji'));
  }
}
