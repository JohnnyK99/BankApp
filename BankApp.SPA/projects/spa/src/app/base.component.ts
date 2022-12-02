import { Component, OnDestroy } from '@angular/core';
import { Subject, Observable, takeUntil } from 'rxjs';

@Component({
  template: '',
})
export class BaseComponent implements OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  observe<T>(observable: Observable<T>): Observable<T> {
    return observable.pipe(takeUntil(this.unsubscribe$));
  }
}
