import { TransactionType } from 'projects/spa/src/app/shared/constants/enums/transaction-type.enum';

export interface Transaction {
  from: string;
  //to: string;
  amount: number;
  title: string;
  type: TransactionType;
  date: Date;
}
