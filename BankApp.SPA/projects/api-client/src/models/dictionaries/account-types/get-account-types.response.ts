import { BaseResponse } from '../../shared/base.response';
import { Result } from '../../shared/result.model';
import { AccountTypeTranslated } from './account-type-translated.model';
import { AccountType } from './account-type.model';

export class GetAccountTypesResponse extends BaseResponse<AccountTypeTranslated[]> {
  constructor(result: Result<AccountType[]>) {
    super({
      ...result,
      data: AccountTypeTranslated.from(result.data),
    });
  }
}
