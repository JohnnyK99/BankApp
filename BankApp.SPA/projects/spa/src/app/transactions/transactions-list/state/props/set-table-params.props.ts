import { PaginationParameters } from 'projects/spa/src/app/shared/models/pagination-parameters.model';
import { SortParameters } from 'projects/spa/src/app/shared/models/sort-parameters.model';

export interface SetTableParamsProps {
  pagination: Partial<PaginationParameters>;
  sort: SortParameters;
}
