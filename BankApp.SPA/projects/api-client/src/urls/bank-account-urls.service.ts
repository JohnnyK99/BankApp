import { Inject, Injectable } from '@angular/core';
import { ApiClientConfigModel } from '../config/config.model';
import { CONFIG } from '../config/config.token';

@Injectable({
  providedIn: 'root',
})
export class BankAccountUrlsService {

  baseUrl = `${this.config.baseApiUrl}/bank-account`;

  constructor(@Inject(CONFIG) private config: ApiClientConfigModel) {}

  getUserBankAccounts(): string {
    return this.baseUrl;
  }
}
