import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { BaseHttp, extras } from './base-http.model';
import { EyeMessageService } from '@core/core/provider/message/message.service';
import { environment } from 'src/environments/env';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpClientService implements BaseHttp {
  _base_url: string | undefined;
  constructor(public http: HttpClient, private _message: EyeMessageService) {
    this._base_url = environment.client.base_url.toString();
  }

  get<T>(
    endpointUrl: string,
    extras: extras = { notification: { error: true } }
  ): Observable<T> {
    const url = `${this._base_url}/${endpointUrl}`;
    return this.http
      .get<T>(url, {
        responseType: extras.options?.responseType,
        headers: extras.options?.header,
        params: extras.options?.params,
      })
      .pipe(
        tap(
          (res: any) => {
            if (extras.notification?.response) {
              this._message.successHandle(
                res,
                extras.notification.toasterColor
              );
            }
          },
          (err) => {
            if (extras.notification?.error) {
              this._message.errorHandle(err, extras.notification.toasterColor);
            }
          }
        )
      );
  }

  post<T>(
    endpointUrl: string,
    body: T,
    extras: extras = { notification: { error: true, response: true } }
  ): Observable<any> {
    const url = `${this._base_url}/${endpointUrl}`;
    return this.http
      .post(url, body, {
        responseType: extras.options?.responseType,
        headers: extras.options?.header,
        params: extras.options?.params,
      })
      .pipe(
        tap(
          (res: any) => {
            if (extras.notification?.response) {
              this._message.successHandle(
                res,
                extras.notification.toasterColor
              );
            }
          },
          (err) => {
            if (extras.notification?.error) {
              this._message.errorHandle(err, extras.notification.toasterColor);
            }
          }
        )
      );
  }

  put<T>(
    endpointUrl: string,
    body: T,
    extras: extras = { notification: { error: true, response: true } }
  ): Observable<any> {
    const url = `${this._base_url}/${endpointUrl}`;
    return this.http
      .put(url, body, {
        responseType: extras.options?.responseType,
        headers: extras.options?.header,
        params: extras.options?.params,
      })
      .pipe(
        tap(
          (res: any) => {
            if (extras.notification?.response) {
              this._message.successHandle(
                res,
                extras.notification.toasterColor
              );
            }
          },
          (err) => {
            if (extras.notification?.error) {
              this._message.errorHandle(err, extras.notification.toasterColor);
            }
          }
        )
      );
  }

  delete(
    endpointUrl: string,
    extras: extras = { notification: { error: true, response: true } }
  ): Observable<any> {
    const url = `${this._base_url}/${endpointUrl}`;
    return this.http
      .delete(url, {
        responseType: extras.options?.responseType,
        headers: extras.options?.header,
        params: extras.options?.params,
      })
      .pipe(
        tap(
          (res: any) => {
            if (extras.notification?.response) {
              this._message.successHandle(
                res,
                extras.notification.toasterColor
              );
            }
          },
          (err) => {
            if (extras.notification?.error) {
              this._message.errorHandle(err, extras.notification.toasterColor);
            }
          }
        )
      );
  }
}
