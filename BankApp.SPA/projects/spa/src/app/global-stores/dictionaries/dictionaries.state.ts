import { AccountTypeTranslated } from 'projects/api-client/src/models/dictionaries/account-types/account-type-translated.model';

export interface DictionariesState {
  accountTypes: AccountTypeTranslated[] | null;
}
