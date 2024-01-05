import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginUserClaimService } from '@core/core/provider/user-claim/login-user-claim.service';

@Injectable({
  providedIn: 'root',
})
export class NotFoundGuardService implements CanActivate {
  constructor(
    private _router: Router,
    private activatedRoute: ActivatedRoute,
    private _claim: LoginUserClaimService
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (this._claim.isloggedIn()) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
