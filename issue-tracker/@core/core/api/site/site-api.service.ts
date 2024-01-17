import { Injectable } from '@angular/core';
import { BaseHttpClientService } from '../base/base-http-client.service';

const endpoint = {
  mainV1: `api/site`,
};

@Injectable({
  providedIn: 'root',
})
export class SiteApiService {
  constructor(private _baseApi: BaseHttpClientService) {}


}
