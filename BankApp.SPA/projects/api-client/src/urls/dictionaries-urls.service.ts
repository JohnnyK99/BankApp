import { Inject, Injectable } from '@angular/core';
import { ApiClientConfigModel } from '../config/config.model';
import { CONFIG } from '../config/config.token';

@Injectable({
  providedIn: 'root',
})
export class DictionariesUrlsService {

  baseUrl = `${this.config.baseApiUrl}/dictionaries`;

  constructor(@Inject(CONFIG) private config: ApiClientConfigModel) {}

  getAccountTypes(): string {
    return `${this.baseUrl}/account-types`;
  }
}
