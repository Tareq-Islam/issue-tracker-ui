import { Injectable } from '@angular/core';
import { BaseHttpClientService } from '../base/base-http-client.service';

const endpoint = {
  mainV1: `api/issue`,
};

@Injectable({
  providedIn: 'root',
})
export class IssueApiService {
  constructor(private _baseApi: BaseHttpClientService) {}


}
