import { Inject, Injectable } from '@angular/core';
import { ApiClientConfigModel } from '../config/config.model';
import { CONFIG } from '../config/config.token';

@Injectable({
  providedIn: 'root',
})
export class TransactionsUrlsService {

  baseUrl = `${this.config.baseApiUrl}/transactions`;

  constructor(@Inject(CONFIG) private config: ApiClientConfigModel) {}

  createTransaction(): string {
    return this.baseUrl;
  }

  getConfirmation(transactionId: number): string {
    return `${this.baseUrl}/${transactionId}/confirmation`;
  }
}
