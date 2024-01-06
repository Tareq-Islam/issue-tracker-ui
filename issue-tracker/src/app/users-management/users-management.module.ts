import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersManagementComponent } from './users-management.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UsersManagementComponent
  },

];
@NgModule({
  imports: [
    CommonModule,
     RouterModule.forChild(routes)
  ],
  declarations: [UsersManagementComponent]
})
export class UsersManagementModule { }
