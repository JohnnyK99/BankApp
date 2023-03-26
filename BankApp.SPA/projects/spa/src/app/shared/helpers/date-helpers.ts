import { formatDate } from '@angular/common';
import { DateFormat } from '../constants/enums/date-format.enum';

export class DateHelpers {
  static format(date: Date, format: DateFormat): string {
    return formatDate(date, format, 'pl-PL');
  }
}
