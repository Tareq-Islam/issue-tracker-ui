import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserClaimService } from '@core/core/provider/user-claim/user-claim.service';

@Component({
  selector: 'eye-route-not-found',
  templateUrl: './route-not-found.component.html',
  styleUrls: ['./route-not-found.component.scss'],
})
export class RouteNotFoundComponent {
  constructor(
    public router: Router,
    private _claim: UserClaimService,
    // private _login: AuthApiService
  ) {}

  onBack() {
    this.onPayload();
  }

  onPayload() {
    // if (this._claim.payload && this._claim.payload.panelType) {
    //   this.router.navigateByUrl('/');
    // } else {
    //   this._login.tokenDecode().subscribe(
    //     (res) => {
    //       this._claim.onLoginProccess({
    //         LoginRes: res,
    //         isTokenStore: false,
    //       });
    //       this.router.navigateByUrl('/');
    //     },
    //     (err) => {
    //       this.router.navigate(['/404']);
    //     }
    //   );
    // }
  }
}
