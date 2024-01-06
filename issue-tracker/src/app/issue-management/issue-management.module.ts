import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueManagementComponent } from './issue-management.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: IssueManagementComponent
  },

];
@NgModule({
  imports: [
    CommonModule,
     RouterModule.forChild(routes)
  ],
  declarations: [IssueManagementComponent]
})
export class IssueManagementModule { }
