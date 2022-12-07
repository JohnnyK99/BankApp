import { Observable, map } from 'rxjs';

export const mapToResponse = <T, S>(constructor: new(t: T) => S) => (source: Observable<T>): Observable<S> => source.pipe(map(s => new constructor(s)));
