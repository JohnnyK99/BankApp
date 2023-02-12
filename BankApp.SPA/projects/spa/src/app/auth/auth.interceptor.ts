import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUrlsService } from 'projects/api-client/src/urls/auth-urls.service';
import { Observable, concatMap, first, EMPTY } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthFacade } from '../global-stores/auth/auth.facade';
import { AuthHelpers } from '../shared/helpers/auth.helpers';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authFacade: AuthFacade,
    private authUrlsService: AuthUrlsService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.isAuthUrl(req) || this.isAssetsUrl(req)) {
      return next.handle(req);
    }

    return this.authFacade.interceptorInfo$
      .pipe(
        first(),
        concatMap((info) => {
          if(!info.accessToken || !info.accessTokenExp) {
            return next.handle(req);
          }

          if(AuthHelpers.isTokenExpired(info.accessTokenExp)) {
            this.authFacade.logout();
            return EMPTY;
          }

          if(this.isApiUrl(req)) {
            return this.processRequestWithToken(info.accessToken, req, next);
          }

          return next.handle(req);
        })
      );
  }

  processRequestWithToken(token: string, req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(
      req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  }

  private isApiUrl(req: HttpRequest<any>): boolean {
    return req.url.startsWith(environment.baseApiUrl);
  }

  private isAuthUrl(req: HttpRequest<any>): boolean {
    return req.url.startsWith(this.authUrlsService.baseUrl) && !req.url.endsWith('clients');
  }

  private isAssetsUrl(req: HttpRequest<any>): boolean {
    return req.url.startsWith('/assets');
  }
}
