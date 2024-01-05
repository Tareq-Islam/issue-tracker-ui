import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from "src/environments/env";
import { LoginUserClaimService } from '../provider/user-claim/login-user-claim.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _claim: LoginUserClaimService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<Object>> {
    let request = req;
    request = this.addCustomHeader(req);
    const token = this._claim.accessToken || this._claim.getToken();
    if (token != null) {
      request = this.addTokenHeader(request, token);
    }

    return next.handle(request).pipe(
      catchError((error) => {

        return throwError(error);
      })
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private addCustomHeader(request: HttpRequest<any>) {
    request = request.clone({
      setHeaders: {
        'X-XRS': `${environment.client.api_key}`,
      },
    });
    return request;
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
