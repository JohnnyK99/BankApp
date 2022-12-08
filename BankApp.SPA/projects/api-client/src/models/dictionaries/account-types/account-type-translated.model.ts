import { TranslationHelpers } from 'projects/api-client/src/helpers/translation.helpers';
import { AccountType } from './account-type.model';

export class AccountTypeTranslated {
  id: number;
  name: Map<string, string>;
  description: Map<string, string>;

  constructor(model: AccountType) {
    this.id = model.id;
    this.name = TranslationHelpers.getTranslationsMap(model.name);
    this.description = TranslationHelpers.getTranslationsMap(model.description);
  }

  static from(obj: AccountType): AccountTypeTranslated;
  static from(obj: AccountType[]): AccountTypeTranslated[];
  static from(obj: AccountType | AccountType[]): AccountTypeTranslated | AccountTypeTranslated[] {
    if(Array.isArray(obj)) {
      return obj.map(item => new AccountTypeTranslated(item));
    }

    return new AccountTypeTranslated(obj);
  }
}
