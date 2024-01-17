import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterGuardService } from '@shared/Guards/auth/router-guard.service';
import { SharedModule } from '@shared/shared.module';
import { HeaderModule } from './header/header.module';
import { PageLayoutComponent } from './page-layout.component';
import { SidebarModule } from './sidebar/sidebar.module';

const routes: Routes = [
  {
    path: '',
    component: PageLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../dashboard/dashboard.module').then(x => x.DashboardModule),
        canActivate: [RouterGuardService],
        data: {endpoint: 'dashboard'}
      },
      {
        path: 'issue-tracker',
        loadChildren: () => import('../issue-management/issue-management.module').then(x => x.IssueManagementModule),
        canActivate: [RouterGuardService],
        data: {endpoint: 'issue'}
      },
      {
        path: 'user',
        loadChildren: () => import('../users-management/users-management.module').then(x => x.UsersManagementModule),
        canActivate: [RouterGuardService],
        data: {endpoint: 'user'}
      },

      {
        path: 'role',
        loadChildren: () => import('../role-management/role-management.module').then(x => x.RoleManagementModule),
        canActivate: [RouterGuardService],
        data: {endpoint: 'role'}
      },

      {
        path: 'vendor',
        loadChildren: () => import('../vendor-management/vendor-management.module').then(x => x.VendorManagementModule),
        canActivate: [RouterGuardService],
        data: {endpoint: 'vendor'}
      },

      {
        path: 'site',
        loadChildren: () => import('../site-management/site-management.module').then(x => x.SiteManagementModule),
        canActivate: [RouterGuardService],
        data: {endpoint: 'site'}
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    SidebarModule,
    HeaderModule,
  ],
  declarations: [PageLayoutComponent],
})
export class PageLayoutModule {}
