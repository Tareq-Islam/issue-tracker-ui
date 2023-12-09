import { Component, Input } from '@angular/core';
import { UserApiService } from '@eye/core/api/user/user-api.service';
import { UserInfo } from '@eye/core/api/user/user.model';

@Component({
  selector: 'eye-info',
  templateUrl: './info.component.html'
})
export class InfoComponent {

  userInfo!: UserInfo;
  userShortName!: string;
  isLoading = true;
  @Input() public set userId(v: number) {
    if (v) {
      this.isLoading = true;
      this._user.getUserInfo(v).subscribe(
        (res) => {
          this.isLoading = false;
          this.userInfo = res.data;
          if (this.userInfo)
            this.userShortName = this.userInfo.name.trim().charAt(0);
        },
        (err) => {
          this.isLoading = false;
        }
      );
    }
  }

  constructor(
    private _user: UserApiService
  ) {}

}
