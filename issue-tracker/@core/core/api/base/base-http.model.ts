import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

export type extras = {
  notification?: {
    response?: boolean;
    toasterColor?: 'Error' | 'Success' | 'Info';
    error: boolean;
  };
  options?: {
    responseType?: any;
    params?: HttpParams;
    header?: any;
  };
};

export interface BaseHttp {
  _base_url: string | undefined;
  get<T>(endpointUrl: string, extras: extras): Observable<T>;
  post<T>(endpointUrl: string, body: T, extras: extras): Observable<any>;
  put<T>(endpointUrl: string, body: T, extras: extras): Observable<any>;
  delete(endpointUrl: string, extras: extras): Observable<any>;
}
