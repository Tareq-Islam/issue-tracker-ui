import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { AuthApiService } from '@core/core/api/auth/login/auth-api.service';
import { Rights } from '@core/core/enum/rights/rights.enum';
import { LoginUserClaimService } from '@core/core/provider/user-claim/login-user-claim.service';
import { STORAGE_KEY, STORAGE_TYPE, StorageService } from '@core/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class RouterGuardService implements CanActivate {
  rights = Rights;

  constructor(
    private _router: Router,
    private activatedRoute: ActivatedRoute,
    private _claim: LoginUserClaimService,
    private _storage: StorageService,
    private _login: AuthApiService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const endpoint = route.data.endpoint;

    if (this._claim.isloggedIn()) {
      if (this._claim.payload) {

        if (endpoint === 'dashboard') {
          return true;
        }


        this._router.navigate(['/404']);
        return false;

      } else {
        this._login.tokenDecode().subscribe(
          (res) => {
            this._claim.onLoginProccess({
              LoginRes: {token: this._storage.get({type: STORAGE_TYPE.Session, key: STORAGE_KEY.Login_token}), payload: res.payload},
              isTokenStore: false,
            });
            this._router.navigateByUrl(state.url);
          },
          (err) => {
            this._router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
          }
        );
        return false;
      }
    } else {
      this._router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }
}
