import { Injectable } from '@angular/core';
import { BaseHttpClientService } from '../base/base-http-client.service';

const endpoint = {
  mainV1: `api/vendor`,
};

@Injectable({
  providedIn: 'root',
})
export class VendorApiService {
  constructor(private _baseApi: BaseHttpClientService) {}


}
