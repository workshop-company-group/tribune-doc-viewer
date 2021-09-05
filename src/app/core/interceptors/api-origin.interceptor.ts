import { HttpEvent, HttpHandler,
  HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AppConfig } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiOriginInterceptor implements HttpInterceptor {

  constructor() { }

  public intercept(
    // intercept is working on every HttpRequest
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    req: HttpRequest<any>, next: HttpHandler,
  // intercept is working on every HttpRequest
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Observable<HttpEvent<any>> {

    if (this.hasOrigin(req)) return next.handle(req);

    const url = AppConfig.serverOrigin + req.url;
    const updatedRequest = req.clone({ url });
    return next.handle(updatedRequest);
  }

  // intercept is working on every HttpRequest
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public hasOrigin(req: HttpRequest<any>): boolean {
    return req.url.includes('://');
  }

}
