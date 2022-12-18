import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
