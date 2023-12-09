import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseHttpClientService } from '@eye/core/api/base/base-http-client.service';

const endpoint = {
  mainV1: `api/v1/Misc`,
  system_time: `system-time`,
  audit_log: 'audit-log',
};

@Injectable({
  providedIn: 'root',
})
export class CommonApiService {
  constructor(private _baseApi: BaseHttpClientService) {}

  getServerTime(): Observable<any> {
    const url = `${endpoint.mainV1}/${endpoint.system_time}`;
    return this._baseApi.get<any>(url);
  }
}
