import { Component, Input } from '@angular/core';
import { UserClaimService } from '@core/core/provider/user-claim/user-claim.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[eye-user-form]',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  isLoginError = false;
  isLoading = false;
  errorMessage = ['Invalid Username or Password'];
  isAdmin = false;

  constructor(
    // private _login: LoginApiService,
    private _claim: UserClaimService
  ) {}

  onLogin(user: { userName: string; password: string }) {
    this.isLoading = true;
    // this._login
    //   .login({ loginName: user.userName, password: user.password })
    //   .subscribe(
    //     (res) => {
    //       if (res) {
    //         this.isLoading = false;
    //         this._claim.onLoginProccess({ LoginRes: res });
    //       }
    //     },
    //     (err) => {
    //       if (err.status === 0) {
    //         this.isLoading = false;
    //         this.isLoginError = true;
    //         this.errorMessage = ['Server not found!!!'];
    //         return;
    //       }
    //       if (err.status === 404) {
    //         this.isLoading = false;
    //         this.isLoginError = true;
    //         this.errorMessage = ['Server not found!!!'];
    //         return;
    //       }
    //       if (err && err.error) {
    //         const { message, statusCode } = err.error;
    //         this.isLoading = false;
    //         this.isLoginError = true;
    //         this.errorMessage = message;
    //       } else {
    //         this.isLoading = false;
    //         this.isLoginError = true;
    //         this.errorMessage = [err.message];
    //       }
    //     }
    //   );
  }
}
