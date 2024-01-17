import { Injectable } from '@angular/core';
import { BaseHttpClientService } from '../base/base-http-client.service';

const endpoint = {
  mainV1: `api/role`,
};

@Injectable({
  providedIn: 'root',
})
export class RoleApiService {
  constructor(private _baseApi: BaseHttpClientService) {}


}
