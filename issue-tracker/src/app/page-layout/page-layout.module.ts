import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterGuardService } from '@shared/Guards/auth/router-guard.service';
import { EyeSharedModule } from '@shared/shared.module';
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
      // {
      //   path: 'ticket',
      //   loadChildren: () => import('../ticket/ticket.module').then(x => x.TicketModule),
      //   canActivate: [RouterGuardService],
      //   data: {endpoint: 'ticket'}
      // },
      // {
      //   path: 'ticket/details/:id',
      //   loadChildren: () => import('../ticket-details/ticket-details.module').then(x => x.TicketDetailsModule),
      //   canActivate: [RouterGuardService],
      //   data: {endpoint: 'ticket-details'}
      // },
      // {
      //   path: 'task',
      //   loadChildren: () => import('../task/task.module').then(x => x.TaskModule),
      //   canActivate: [RouterGuardService],
      //   data: {endpoint: 'task'}
      // },
      // {
      //   path: 'ticket/template',
      //   loadChildren: () => import('../task-category/task-category.module').then(x => x.TaskCategoryModule),
      //   canActivate: [RouterGuardService],
      //   data: {endpoint: 'ticket_template'}
      // },
      // {
      //   path: 'findings',
      //   loadChildren: () => import('../cause-findings/cause-findings.module').then(x => x.CauseFindingsModule),
      //   canActivate: [RouterGuardService],
      //   data: {endpoint: 'findings'}
      // },
      // {
      //   path: 'task/solution',
      //   loadChildren: () => import('../solution-tag/solution-tag.module').then(x => x.SolutionTagModule),
      //   canActivate: [RouterGuardService],
      //   data: {endpoint: 'task-solution'}
      // },
      // {
      //   path: 'vendor',
      //   loadChildren: () => import('../vendor/representative/representative.module').then(x => x.RepresentativeModule),
      //   canActivate: [RouterGuardService],
      //   data: {endpoint: 'vendor'}
      // }
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EyeSharedModule,
    SidebarModule,
    HeaderModule,
  ],
  declarations: [PageLayoutComponent],
})
export class PageLayoutModule {}
