import { TransactionsListFilters } from 'projects/spa/src/app/shared/models/transactions-list-filters.model';

export interface SetFiltersProps {
  filters: Partial<TransactionsListFilters>;
}
