import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mapToResponse } from '../helpers/map.helpers';
import { BankAccount } from '../models/bank-accounts/bank-account.model';
import { GetUserBankAccountsResponse } from '../models/bank-accounts/get-user-bank-accounts.response';
import { EmptyResponse } from '../models/shared/empty.response';
import { Result } from '../models/shared/result.model';
import { BankAccountsUrlsService } from '../urls/bank-accounts-urls.service';

@Injectable({
  providedIn: 'root',
})
export class BankAccountApiClient {
  constructor(
    private accountUrls: BankAccountsUrlsService,
    private http: HttpClient
  ) {}

  getUserBankAccounts(): Observable<GetUserBankAccountsResponse> {
    return this.http.get<Result<BankAccount[]>>(this.accountUrls.getUserBankAccounts())
      .pipe(mapToResponse(GetUserBankAccountsResponse));
  }

  createBankAccount(accountTypeId: number): EmptyResponse {
    return this.http.post(this.accountUrls.createBankAccount(), { accountTypeId });
  }
}
