import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiOriginInterceptor } from './api-origin.interceptor';
import { NetworkInterceptor } from '../../network/interceptors';

export const interceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ApiOriginInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true },
];
