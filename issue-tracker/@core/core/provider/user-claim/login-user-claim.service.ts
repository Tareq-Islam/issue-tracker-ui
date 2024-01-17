import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserClaim } from '@core/core/api/auth/login/auth.model';
import { STORAGE_KEY, STORAGE_TYPE, StorageService } from '@core/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginUserClaimService {
  private _accessToken!: string;
  private _userName!: string;
  private _roleName!: string;

  public get accessToken(): string {
    return this._accessToken;
  }
  public get userName(): string {
    return this._userName;
  }
  public get roleName(): string {
    return this._roleName;
  }


  constructor(
    private _router: Router,
    private _storage: StorageService
  ) {}

  private _setProperty({
    token,
    userName,
    roleName,
  }: {
    token?: string;
    userName?: string;
    roleName?: string;
  }) {
    this._accessToken = token || '';
    this._userName = userName || 'Administrative';
    this._roleName = roleName || '';
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
      roleName: LoginRes.roleName,
      token: LoginRes.token ? LoginRes.token : this.getToken(),
      userName: LoginRes.userName,
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
