import { Injectable } from '@angular/core';
import { BaseHttpClientService } from '../base/base-http-client.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../common/api-response.model';

const endpoint = {
  mainV1: `api/Category`,
};

@Injectable({
  providedIn: 'root',
})
export class CategoryApiService {
  constructor(private _baseApi: BaseHttpClientService) {}
  gets(): Observable<ApiResponse<any[]>> {
    return this._baseApi.get<any>(endpoint.mainV1, {
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
