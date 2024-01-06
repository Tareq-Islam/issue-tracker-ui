import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteManagementComponent } from './site-management.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: SiteManagementComponent
  },

];
@NgModule({
  imports: [
    CommonModule,
     RouterModule.forChild(routes)
  ],
  declarations: [SiteManagementComponent]
})
export class SiteManagementModule { }
