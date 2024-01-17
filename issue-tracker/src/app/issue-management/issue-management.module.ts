import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueManagementComponent } from './issue-management.component';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { CauseFindingsComponent } from './cause-findings/cause-findings.component';
import { SolutionTagComponent } from './solution-tag/solution-tag.component';
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
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [IssueManagementComponent],
})
export class IssueManagementModule {}
