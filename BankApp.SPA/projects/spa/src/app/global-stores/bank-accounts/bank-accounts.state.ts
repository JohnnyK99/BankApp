import { BankAccountTranslated } from 'projects/api-client/src/models/bank-accounts/bank-account-translated.model';

export interface BankAccountsState {
  bankAccounts: BankAccountTranslated[] | null;
  selectedBankAccountIndex: number | null;
}
