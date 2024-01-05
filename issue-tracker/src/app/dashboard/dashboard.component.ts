import { Component, OnInit } from '@angular/core';
import { LoginUserClaimService } from '@core/core/provider/user-claim/login-user-claim.service';
import { EyeDate } from '@core/utils/date/date.model';
import { HeaderService } from '@page-layout/header/service/header.service';

@Component({
  selector: 'eye-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  geetings!: string;

  constructor(
    private _header: HeaderService,
    public claim: LoginUserClaimService
  ) { }

  ngOnInit() {
    this._header.headerName = 'Dashboard';
    this.geetings = EyeDate.greetingsMessage();
  }

}
