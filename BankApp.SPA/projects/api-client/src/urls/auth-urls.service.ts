import { Inject, Injectable } from '@angular/core';
import { ApiClientConfigModel } from '../config/config.model';
import { CONFIG } from '../config/config.token';

@Injectable({
  providedIn: 'root',
})
export class AuthUrlsService {

  baseUrl = `${this.config.baseApiUrl}/auth`;

  constructor(@Inject(CONFIG) private config: ApiClientConfigModel) {}

  login(): string {
    return `${this.baseUrl}/login`;
  }

  register(): string {
    return `${this.baseUrl}/registerr`;
  }

  refreshToken(): string {
    return `${this.baseUrl}/refresh`;
  }
}
