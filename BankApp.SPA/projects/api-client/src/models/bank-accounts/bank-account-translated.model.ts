import { IdTranslation } from '../shared/id-translations.model';
import { Transaction } from '../transactions/transaction.model';
import { BankAccount } from './bank-account.model';

export class BankAccountTranslated {
  accountType: IdTranslation;
  balance: number;
  accountNumber: string;
  lastTransactions: Transaction[];

  constructor(model: BankAccount) {
    this.accountType = IdTranslation.from(model.accountType);
    this.balance = model.balance;
    this.accountNumber = model.accountNumber;
    this.lastTransactions = model.lastTransactions;
  }

  static from(obj: BankAccount): BankAccountTranslated;
  static from(obj: BankAccount[]): BankAccountTranslated[];
  static from(obj: BankAccount | BankAccount[]): BankAccountTranslated | BankAccountTranslated[] {
    if(Array.isArray(obj)) {
      return obj.map(item => new BankAccountTranslated(item));
    }

    return new BankAccountTranslated(obj);
  }
}
