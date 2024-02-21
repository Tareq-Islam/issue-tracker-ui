import { Injectable } from '@angular/core';
import { BaseHttpClientService } from '../base/base-http-client.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../common/api-response.model';

const endpoint = {
  mainV1: `api/CauseFindings`,
};

@Injectable({
  providedIn: 'root',
})
export class CauseFindingsApiService {
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
    return this._baseApi.put(endpoint.mainV1, {
      endpointUrl: `${endpoint}/${id}`,
    });
  }

}
