import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiOriginInterceptor } from './api-origin.interceptor';

export const interceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ApiOriginInterceptor, multi: true },
];
