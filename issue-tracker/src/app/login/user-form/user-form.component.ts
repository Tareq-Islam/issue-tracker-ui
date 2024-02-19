import { Component, Input } from '@angular/core';
import { AuthApiService } from '@core/core/api/auth/login/auth-api.service';
import { LoginUserClaimService } from '@core/core/provider/user-claim/login-user-claim.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[eye-user-form]',
  templateUrl: './user-form.component.html',
  providers: [AuthApiService]
})
export class UserFormComponent {
  isLoginError = false;
  isLoading = false;
  errorMessage = ['Invalid Username or Password'];
  isAdmin = false;

  constructor(
    private _authApi: AuthApiService,
    private _claim: LoginUserClaimService
  ) {}

  onLogin(user: { userName: string; password: string }) {
    this.isLoading = true;
    this._authApi
      .token({ loginName: user.userName, password: user.password })
      .subscribe(
        (res) => {
          if (res) {
            this.isLoading = false;
            this._claim.onLoginProccess({ LoginRes: res });
          }
        },
        (err) => {
          if (err.status === 0) {
            this.isLoading = false;
            this.isLoginError = true;
            this.errorMessage = ['Server not found!!!'];
            return;
          }
          if (err.status === 404) {
            this.isLoading = false;
            this.isLoginError = true;
            this.errorMessage = ['Server not found!!!'];
            return;
          }
          if (err && err.error) {
            const { message, statusCode } = err.error;
            this.isLoading = false;
            this.isLoginError = true;
            this.errorMessage = message;
          } else {
            this.isLoading = false;
            this.isLoginError = true;
            this.errorMessage = [err.message];
          }
        }
      );
  }
}
