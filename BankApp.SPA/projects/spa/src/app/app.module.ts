/* eslint-disable camelcase */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalStoresModule } from './global-stores/global-stores.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AuthModule } from './auth/auth.module';
import { ApiClientConfigModel } from 'projects/api-client/src/config/config.model';
import { environment } from '../environments/environment';
import { ApiClientModule } from 'projects/api-client/api-client.module';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './auth/auth.interceptor';
import { NgxMaskModule } from 'ngx-mask';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { registerLocaleData } from '@angular/common';

import pl from '@angular/common/locales/pl';
import { NZ_I18N, pl_PL } from 'ng-zorro-antd/i18n';

registerLocaleData(pl);

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

const apiClientConfig: ApiClientConfigModel = {
  baseApiUrl: environment.baseApiUrl,
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    GlobalStoresModule,
    AuthModule,
    NzButtonModule,
    ApiClientModule.forRoot(apiClientConfig),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    NgxMaskModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: NZ_I18N,
      useValue: pl_PL,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
