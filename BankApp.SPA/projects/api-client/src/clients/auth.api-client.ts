import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/auth/login.model';
import { TokenResponse } from '../models/auth/token.response';
import { AuthUrlsService } from '../urls/auth/auth-urls.service';

@Injectable({
  providedIn: 'root',
})
export class AuthApiClient {

  constructor(
    private authUrls: AuthUrlsService,
    private http: HttpClient
  ) {}

  login(loginModel: LoginModel): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(this.authUrls.login(), loginModel);
  }
}
