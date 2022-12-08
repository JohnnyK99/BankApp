import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mapToResponse } from '../helpers/map.helpers';
import { AccountType } from '../models/dictionaries/account-types/account-type.model';
import { GetAccountTypesResponse } from '../models/dictionaries/account-types/get-account-types.response';
import { Result } from '../models/shared/result.model';
import { DictionariesUrlsService } from '../urls/dictionaries-urls.service';

@Injectable({
  providedIn: 'root',
})
export class DictionariesApiClient {
  constructor(
    private dictionariesUrls: DictionariesUrlsService,
    private http: HttpClient
  ) {}

  getAccountTypes(): Observable<GetAccountTypesResponse> {
    return this.http.get<Result<AccountType[]>>(this.dictionariesUrls.getAccountTypes())
      .pipe(mapToResponse(GetAccountTypesResponse));
  }
}
