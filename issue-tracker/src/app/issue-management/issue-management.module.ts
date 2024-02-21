import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueManagementComponent } from './issue-management.component';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { CauseFindingsComponent } from './cause-findings/cause-findings.component';
import { SolutionTagComponent } from './solution-tag/solution-tag.component';
import { EyeMenuModule } from '@menu/eye-menu.module';
import { SharedModule } from '@shared/shared.module';
import { HeaderModule } from '@page-layout/header/header.module';
import { ListItemsModule } from '@list-item/list-items.module';
import { ScrollLayoutModule } from '@scroll-layout/scroll-layout.module';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { EyeFormsModule } from '@forms/eye-forms.module';
const routes: Routes = [
  {
    path: '',
    component: IssueManagementComponent,
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      {
        path: 'issue',
        loadChildren: () =>
          import('./issues/issues.module').then((x) => x.IssuesModule),
      },
      { path: 'category', component: CategoryComponent },
      { path: 'cause/findings', component: CauseFindingsComponent },
      { path: 'solution/tag', component: SolutionTagComponent },
    ],
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EyeMenuModule,
    SharedModule,
    ButtonModule,
    RippleModule,
    ScrollLayoutModule,
    ListItemsModule,
    HeaderModule,
    EyeFormsModule
  ],
  declarations: [IssueManagementComponent, SolutionTagComponent, CauseFindingsComponent, CategoryComponent],
})
export class IssueManagementModule {}
