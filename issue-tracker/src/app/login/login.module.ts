import { FormComponent } from './form/form.component';
import { LogoComponent } from './logo/logo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CoreModule } from '@core/core/core.module';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    ButtonModule,
    CoreModule,
  ],
  declarations: [
    LoginComponent,
    UserFormComponent,
    LogoComponent,
    FormComponent,
  ],
})
export class LoginModule {}
