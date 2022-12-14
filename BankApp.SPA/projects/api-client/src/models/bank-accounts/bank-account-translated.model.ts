import { TransactionType } from 'projects/spa/src/app/shared/constants/enums/transaction-type.enum';
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
    this.lastTransactions = [
      { from: 'Urząd skarbowy', amount: 1000, title: 'Podatek', type: TransactionType.Incoming, date: new Date(2022, 10, 10, 12, 30) },
      { from: 'Mama asd as das dsa da sd', amount: 1000, title: 'Prezent urodzinowy Prezent urodzinowy Prezent urodzinowy Prezent urodzinowy Prezent urodzinowy', type: TransactionType.Incoming, date: new Date(2022, 10, 10, 12, 30) },
      { from: 'Piotrek', amount: 1000, title: 'Pizza', type: TransactionType.Outcoming, date: new Date(2022, 10, 10, 12, 30) },
    ];
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
