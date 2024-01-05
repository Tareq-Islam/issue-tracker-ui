import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Rights } from '@core/core/enum/rights/rights.enum';
import { LoginUserClaimService } from '@core/core/provider/user-claim/login-user-claim.service';

@Injectable({
  providedIn: 'root',
})
export class RouterGuardService implements CanActivate {
  rights = Rights;

  constructor(
    private _router: Router,
    private activatedRoute: ActivatedRoute,
    private _claim: LoginUserClaimService,
    // private _login: AuthApiService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return true;
    // const endpoint = route.data.endpoint;

    // if (this._claim.isloggedIn()) {
    //   if (this._claim.payload && this._claim.userName !== undefined) {

    //     if (endpoint === 'dashboard') {
    //       return true;
    //     }


    //     this._router.navigate(['/404']);
    //     return false;

    //   } else {
    //     this._login.tokenDecode().subscribe(
    //       (res) => {
    //         this._claim.onLoginProccess({
    //           LoginRes: res,
    //           isTokenStore: false,
    //         });
    //         this._router.navigateByUrl(state.url);
    //       },
    //       (err) => {
    //         this._router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    //       }
    //     );
    //     return false;
    //   }
    // } else {
    //   this._router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    //   return false;
    // }
  }
}
