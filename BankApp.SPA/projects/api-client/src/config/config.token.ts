import { InjectionToken } from '@angular/core';
import { ApiClientConfigModel } from './config.model';

export const CONFIG = new InjectionToken<ApiClientConfigModel>('API_CLIENT_CONFIG');
