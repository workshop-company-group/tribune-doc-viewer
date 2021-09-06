import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { timeout, catchError, retry } from 'rxjs/operators';

import { NetworkService } from '../services';

const HTTP_RESPONSE_TIMEOUT = 2000;
const HTTP_RETRY_NUMBER = 3;

@Injectable({
  providedIn: 'root',
})
export class NetworkInterceptor implements HttpInterceptor {

  constructor(
    private readonly network: NetworkService,
  ) { }

  public intercept(
    // intercept is working on every HttpRequest
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    req: HttpRequest<any>, next: HttpHandler,
  // intercept is working on every HttpRequest
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      timeout(HTTP_RESPONSE_TIMEOUT),
      retry(HTTP_RETRY_NUMBER),
      catchError(error => {
        this.network.connection.next(false);
        return throwError(error);
      }),
    );
  }
}
