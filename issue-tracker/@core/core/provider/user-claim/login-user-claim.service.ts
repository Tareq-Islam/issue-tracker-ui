import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Payload, UserClaim } from '@core/core/api/auth/login/auth.model';
import { STORAGE_KEY, STORAGE_TYPE, StorageService } from '@core/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginUserClaimService {
  private _accessToken!: string;
  private _payload!: Payload;

  public get accessToken(): string {
    return this._accessToken;
  }

  public get payload(): Payload {
    return this._payload;
  }

  constructor(
    private _router: Router,
    private _storage: StorageService
  ) {}

  private _setProperty({
    token,
    payload
  }: {
    token?: string;
    payload?: Payload;
  }) {
    this._accessToken = token || '';
    this._payload = payload || {roleId: 0, roleName: '', roleType: 1, userId: 0, userName: ''}
  }

  onLoginProccess({
    LoginRes,
    isTokenStore = true,
    returnUrl = '/'
  }: {
    LoginRes: UserClaim;
    isTokenStore?: boolean;
    returnUrl?: string;
  }): void {
    if (isTokenStore && LoginRes.token) {
      this._store(LoginRes.token, STORAGE_KEY.Login_token);
    }
    this._setProperty({
      token: LoginRes.token ? LoginRes.token : this.getToken(),
      payload: LoginRes.payload
    });
    this._router.navigate([returnUrl]);
  }

  private _cookieStore(branch: any, key: STORAGE_KEY) {
    this._storage.save({
      type: STORAGE_TYPE.Cookie,
      key: key,
      value: JSON.stringify(branch),
      path: '/',
      expires: new Date(new Date().setFullYear(2040)),
    });
  }

  private _store(token: string, key: STORAGE_KEY) {
    this._storage.save({
      type: STORAGE_TYPE.Session,
      key: key,
      value: token,
    });
  }

  isloggedIn() {
    const token = this.getToken();
    return token ? true : false;
  }

  onLogout() {
    this._storage.removeAll({ type: STORAGE_TYPE.Session });
    this._storage.removeAll({ type: STORAGE_TYPE.Local });
    this._router.navigate(['/login']);
  }

  getGlobalStoreBranch(): { branchId: string; branchName: string } | null {
    const branch = this._storage.get({
      type: STORAGE_TYPE.Cookie,
      key: STORAGE_KEY.Login_token,
    });
    return JSON.parse(branch);
  }

  getToken() {
    const token = this._storage.get({
      type: STORAGE_TYPE.Session,
      key: STORAGE_KEY.Login_token,
    });
    return token;
  }
}
