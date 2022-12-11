import { IdTranslationsApi } from '../shared/id-translations-api.model';
import { Transaction } from '../transactions/transaction.model';

export interface BankAccount {
  id: number;
  accountType: IdTranslationsApi;
  balance: number;
  accountNumber: string;
  lastTransactions: Transaction[];
}
