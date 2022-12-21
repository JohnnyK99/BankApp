import { SortDirection } from '../constants/enums/sort-direction.enum';

export interface SortParameters {
  column?: string;
  sortDirection?: SortDirection;
}
