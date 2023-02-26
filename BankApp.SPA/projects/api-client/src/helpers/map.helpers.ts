import { HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { HttpHelpers } from './http.helpers';

export const mapToResponse = <T, S>(constructor: new(t: T) => S) =>
  (source: Observable<T>): Observable<S> => source.pipe(map(s => new constructor(s)));

export const mapBlobResponseToFile = (defaultFileName: string) =>
  (source: Observable<HttpResponse<Blob>>): Observable<File> => source.pipe(map(resp => HttpHelpers.mapResponseToFile(resp, defaultFileName)));
