import { Injectable } from '@angular/core';
import { BaseHttpClientService } from '../base/base-http-client.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../common/api-response.model';
import { HttpParams } from '@angular/common/http';

const endpoint = {
  mainV1: `api/issue`,
  status: `status`,
};

@Injectable({
  providedIn: 'root',
})
export class IssueApiService {
  constructor(private _baseApi: BaseHttpClientService) {}
  gets(params?: HttpParams): Observable<ApiResponse<any[]>> {
    return this._baseApi.get<any>(endpoint.mainV1, {
      notification: { error: false },
      options: {
        params: params
      }
    });
  }

  getStatus(): Observable<ApiResponse<{open: number, closed: number}>> {
    const url = `${endpoint.mainV1}/${endpoint.status}`;
    return this._baseApi.get<any>(url, {
      notification: { error: false },
    });
  }

  save(data: any) {
    const url = `${endpoint.mainV1}`;
    return this._baseApi.post(url, data);
  }

  update(id: number, data: any) {
    const url = `${endpoint.mainV1}/${id}`;
    return this._baseApi.put(url, data);
  }

  delete(id: number) {
    const url = `${endpoint.mainV1}/${id}`;
    return this._baseApi.delete(url);
  }

}
