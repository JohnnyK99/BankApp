import { TransactionType } from 'projects/spa/src/app/shared/constants/enums/transaction-type.enum';

export interface Transaction {
  id: number;
  accountNumberFrom: string;
  accountNumberTo: string;
  title: string;
  description: string;
  date: Date;
  amount: number;
  transactionType: TransactionType;
}
