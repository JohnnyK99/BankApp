export const TransactionsConstants = {
  accountNumberMask: '00 0000 0000 0000 0000 0000 0000',
  accountNumberRegex: '\\d{26}|\\d{2}[ ]\\d{4}[ ]\\d{4}[ ]\\d{4}[ ]\\d{4}[ ]\\d{4}[ ]\\d{4}',
  minTransactionAmount: 0.01,
  defaultPageSize: 10,
  pageSizeOptions: [10, 15, 30, 50],
};
