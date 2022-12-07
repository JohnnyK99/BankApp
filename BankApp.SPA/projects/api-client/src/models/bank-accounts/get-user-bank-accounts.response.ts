import { BaseResponse } from '../shared/base.response';
import { Result } from '../shared/result.model';
import { BankAccountTranslated } from './bank-account-translated.model';
import { BankAccount } from './bank-account.model';

export class GetUserBankAccountsResponse extends BaseResponse<BankAccountTranslated[]> {
  constructor(result: Result<BankAccount[]>) {
    super({
      ...result,
      data: BankAccountTranslated.from(result.data),
    });
  }
}
