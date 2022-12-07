import { BankAccountTranslated } from 'projects/api-client/src/models/bank-accounts/bank-account-translated.model';

export interface DashboardState {
  bankAccounts: BankAccountTranslated[] | null;
}
