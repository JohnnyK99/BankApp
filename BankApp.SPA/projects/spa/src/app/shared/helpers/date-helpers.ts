import { formatDate } from '@angular/common';

export class DateHelpers {
  static format(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'pl-PL');
  }
}
