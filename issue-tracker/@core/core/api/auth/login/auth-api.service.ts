import { Injectable } from '@angular/core';
import { filter, map, Observable, of } from 'rxjs';
import { BaseHttpClientService } from '../../base/base-http-client.service';
import { PayloadAdapter, UserClaim } from './auth.model';
import { SeedValues } from '../../user/user.model';

const endpoint = {
  mainV1: `api/Auth`,
  login: `login`,
  decode: `decode`,
};

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private _baseApi: BaseHttpClientService) {}

  tokenDecode(): Observable<UserClaim> {
    const url = `${endpoint.mainV1}/${endpoint.decode}`;
    return this._baseApi
      .get<any>(url)
      .pipe(map((x) => new PayloadAdapter().adapt(x)));
  }

  token(data: { loginName: string; password: string }): Observable<UserClaim> {
    const url = `${endpoint.mainV1}/${endpoint.login}`;
    // return this._baseApi
    //   .post(url, data, {
    //     notification: { error: false, response: false },
    //   })
    //   .pipe(map((x) => new PayloadAdapter().adapt(x)));
    const users = of(SeedValues);
    return users.pipe(filter(x => x.some(y => y.userName === data.loginName && y.password === data.password)), map(x => new PayloadAdapter().adapt(x)));
  }
}
