import { Inject, Injectable } from '@angular/core';
import { ApiClientConfigModel } from '../config/config.model';
import { CONFIG } from '../config/config.token';

@Injectable({
  providedIn: 'root',
})
export class AddressBookUrlsService {

  baseUrl = `${this.config.baseApiUrl}/recipients`;

  constructor(@Inject(CONFIG) private config: ApiClientConfigModel) {}

  getAllEntries(): string {
    return this.baseUrl;
  }

  addEntry(): string {
    return this.baseUrl;
  }

  removeEntry(): string {
    return this.baseUrl;
  }
}
