import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorManagementComponent } from './vendor-management.component';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: VendorManagementComponent
  },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VendorManagementComponent]
})
export class VendorManagementModule { }
