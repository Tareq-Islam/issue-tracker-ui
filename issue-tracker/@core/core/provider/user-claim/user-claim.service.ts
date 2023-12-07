import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '@core/storage/storage.service';


@Injectable({
  providedIn: 'root',
})
export class UserClaimService {
  // private _defaultPayload: AuthPayload = this._setPayload();
  private _accessToken!: string;
  private _userName!: string;
  private _permissionName!: string;
  private _roleName!: string;
  // private _payload!: AuthPayload;
  private _rights!: number[];
  private _systemTime!: string;
  isViewOnly = false;

  public get accessToken(): string {
    return this._accessToken;
  }
  public get userName(): string {
    return this._userName;
  }
  public get permissionName(): string {
    return this._permissionName;
  }
  public get roleName(): string {
    return this._roleName;
  }

  // public get payload(): AuthPayload {
  //   return this._payload;
  // }
  public get rights(): number[] {
    return this._rights;
  }
  public get systemTime(): string {
    return this._systemTime;
  }

  constructor(
    private _router: Router,
    private _storage: StorageService
  ) {}

  // private _setProperty({
  //   token,
  //   userName,
  //   permissionName,
  //   roleName,
  //   payload,
  //   rights,
  // }: {
  //   token?: string;
  //   userName?: string;
  //   permissionName?: string;
  //   roleName?: string;
  //   payload?: AuthPayload;
  //   rights?: string;
  // }) {
  //   this._accessToken = token || '';
  //   this._userName = userName || '';
  //   this._permissionName = permissionName || '';
  //   this._roleName = roleName || '';
  //   this._payload = payload || this._defaultPayload;
  //   this._rights = [];
  //   if (rights) {
  //     const rightsArray = rights.split(',');
  //     this._rights =
  //       rightsArray.length > 0 ? rightsArray.map((x) => Number(x)) : [];
  //   }
  // }

  // private _setPayload(): AuthPayload {
  //   return {
  //     customerId: '',
  //     organizationId: '',
  //     panelType: '',
  //     permissionLevel: '',
  //     userId: '',
  //   };
  // }

  // onLoginProccess({
  //   LoginRes,
  //   isTokenStore = true,
  //   returnUrl = '/'
  // }: {
  //   LoginRes: UserClaim;
  //   isTokenStore?: boolean;
  //   returnUrl?: string;
  // }): void {
  //   if (isTokenStore && LoginRes.token) {
  //     this._store(LoginRes.token, STORAGE_KEY.Login_token);
  //   }
  //   this._setProperty({
  //     payload: LoginRes.payload,
  //     permissionName: LoginRes.permissionName,
  //     rights: LoginRes.rights,
  //     roleName: LoginRes.roleName,
  //     token: LoginRes.token ? LoginRes.token : this.getToken(),
  //     userName: LoginRes.userName,
  //   });
  //   this._router.navigate([returnUrl]);
  // }

  // private _cookieStore(branch: BranchDropdownMenuItem, key: STORAGE_KEY) {
  //   this._storage.save({
  //     type: STORAGE_TYPE.Cookie,
  //     key: key,
  //     value: JSON.stringify(branch),
  //     path: '/',
  //     expires: new Date(new Date().setFullYear(2040)),
  //   });
  // }

  // private _store(token: string, key: STORAGE_KEY) {
  //   this._storage.save({
  //     type: STORAGE_TYPE.Session,
  //     key: key,
  //     value: token,
  //   });
  // }

  // isloggedIn() {
  //   const token = this.getToken();
  //   return token ? true : false;
  // }

  // onLogout() {
  //   this._storage.removeAll({ type: STORAGE_TYPE.Session });
  //   this._storage.removeAll({ type: STORAGE_TYPE.Local });
  //   this._router.navigate(['/login']);
  // }

  // getGlobalStoreBranch(): { branchId: string; branchName: string } | null {
  //   const branch = this._storage.get({
  //     type: STORAGE_TYPE.Cookie,
  //     key: STORAGE_KEY.Branch_Id,
  //   });
  //   return JSON.parse(branch);
  // }

  // getToken() {
  //   const token = this._storage.get({
  //     type: STORAGE_TYPE.Session,
  //     key: STORAGE_KEY.Login_token,
  //   });
  //   return token;
  // }
}
