import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ApiClientConfigModel } from './src/config/config.model';
import { CONFIG } from './src/config/config.token';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  exports: [
    HttpClientModule,
  ],
})
export class ApiClientModule {
  static forRoot(config: ApiClientConfigModel): ModuleWithProviders<ApiClientModule> {
    return {
      ngModule: ApiClientModule,
      providers: [
        {
          provide: CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
