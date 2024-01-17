import { Injectable } from '@angular/core';
import { BaseHttpClientService } from '../base/base-http-client.service';

const endpoint = {
  mainV1: `api/user`,
};

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private _baseApi: BaseHttpClientService) {}


}
