import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUserClaimService } from '@core/core/provider/user-claim/login-user-claim.service';

@Component({
  selector: 'eye-route-not-found',
  templateUrl: './route-not-found.component.html',
  styleUrls: ['./route-not-found.component.scss'],
})
export class RouteNotFoundComponent {
  constructor(
    public router: Router,
    private _claim: LoginUserClaimService,
    // private _login: AuthApiService
  ) {}

  onBack() {
    this.onPayload();
  }

  onPayload() {
    this.router.navigateByUrl('/');
  }
}
