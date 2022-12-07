import { IdTranslationsApi } from '../shared/id-translations-api.model';
import { Transaction } from '../transactions/transaction.model';

export interface BankAccount {
  accountType: IdTranslationsApi;
  balance: number;
  accountNumber: string;
  lastTransactions: Transaction[];
}
