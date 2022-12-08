import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mapToResponse } from '../helpers/map.helpers';
import { BankAccount } from '../models/bank-accounts/bank-account.model';
import { GetUserBankAccountsResponse } from '../models/bank-accounts/get-user-bank-accounts.response';
import { Result } from '../models/shared/result.model';
import { BankAccountUrlsService } from '../urls/bank-account-urls.service';

@Injectable({
  providedIn: 'root',
})
export class BankAccountApiClient {
  constructor(
    private accountUrls: BankAccountUrlsService,
    private http: HttpClient
  ) {}

  getUserBankAccounts(): Observable<GetUserBankAccountsResponse> {
    return this.http.get<Result<BankAccount[]>>(this.accountUrls.getUserBankAccounts())
      .pipe(mapToResponse(GetUserBankAccountsResponse));
  }
}
