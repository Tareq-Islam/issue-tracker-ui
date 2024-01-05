import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core/core.module';
import { RouterModule, Routes } from '@angular/router';
import { RouteNotFoundComponent } from '@shared/components/route-not-found/route-not-found.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { PageLayoutModule } from '@page-layout/page-layout.module';
import { SharedModule } from '@shared/shared.module';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { FormlyModule } from '@ngx-formly/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AppMessageService } from '@config/app-message/app-message.service';
import { NotFoundGuardService } from '@shared/Guards/auth/not-found-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '404',
    component: RouteNotFoundComponent
  },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];



@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PageLayoutModule,
    RouterModule.forRoot(routes),
    CoreModule,
    SharedModule,
    ToastModule,
    ReactiveFormsModule,
    FormlyPrimeNGModule,
    FormlyModule.forRoot({ extras: { lazyRender: true } }),
  ],
  declarations: [
    AppComponent
  ],
  providers: [NotFoundGuardService, AppMessageService, DialogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
