import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenResponse } from '../models/auth/token-response.model';
import { LoginModel } from '../models/auth/login.model';
import { RegistrationModel } from '../models/auth/registration.model';
import { Result } from '../models/shared/result.model';
import { AuthUrlsService } from '../urls/auth-urls.service';
import { TokenRefreshModel } from '../models/auth/token-refresh.model';
import { BaseResponse } from '../models/shared/base.response';
import { Client } from '../models/auth/client.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApiClient {

  constructor(
    private authUrls: AuthUrlsService,
    private http: HttpClient
  ) {}

  login(model: LoginModel): Observable<Result<TokenResponse>> {
    return this.http.post<Result<TokenResponse>>(this.authUrls.login(), model);
  }

  register(model: RegistrationModel): Observable<undefined> {
    return this.http.post<undefined>(this.authUrls.register(), model);
  }

  refreshToken(model: TokenRefreshModel): Observable<Result<TokenResponse>> {
    return this.http.post<Result<TokenResponse>>(this.authUrls.refreshToken(), model);
  }

  getClients(searchBy: string): Observable<BaseResponse<Client[]>> {
    return this.http.get<BaseResponse<Client[]>>(this.authUrls.getClients(), { params: { searchBy: searchBy ?? '' } });
  }
}
