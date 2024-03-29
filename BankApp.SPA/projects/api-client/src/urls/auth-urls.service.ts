import { Inject, Injectable } from '@angular/core';
import { ApiClientConfigModel } from '../config/config.model';
import { CONFIG } from '../config/config.token';

@Injectable({
  providedIn: 'root',
})
export class AuthUrlsService {

  baseUrl = `${this.config.baseApiUrl}/auth`;

  constructor(@Inject(CONFIG) private config: ApiClientConfigModel) {}

  getClients(): string {
    return `${this.baseUrl}/clients`;
  }

  login(): string {
    return `${this.baseUrl}/login`;
  }

  register(): string {
    return `${this.baseUrl}/register`;
  }

  refreshToken(): string {
    return `${this.baseUrl}/refresh`;
  }
}
