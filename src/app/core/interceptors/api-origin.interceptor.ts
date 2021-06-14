import { HttpEvent, HttpHandler,
  HttpInterceptor, HttpRequest, } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AppConfig } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiOriginInterceptor implements HttpInterceptor {

  constructor() { }

  public intercept(req: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpEvent<any>> {

      if (this.hasOrigin(req)) return next.handle(req);

      const url = AppConfig.serverOrigin + req.url;
      req = req.clone({ url });
      return next.handle(req);
  }

  public hasOrigin(req: HttpRequest<any>): boolean {
    return req.url.includes('://');
  }

}
