import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorManagementComponent } from './vendor-management.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ListItemsModule } from '@list-item/list-items.module';
import { EyeMenuModule } from '@menu/eye-menu.module';
import { ScrollLayoutModule } from '@scroll-layout/scroll-layout.module';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { HeaderModule } from '@page-layout/header/header.module';
import { EyeFormsModule } from '@forms/eye-forms.module';

export const routes: Routes = [
  {
    path: '',
    component: VendorManagementComponent
  },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ButtonModule,
    RippleModule,
    ScrollLayoutModule,
    ListItemsModule,
    HeaderModule,
    EyeMenuModule,
    EyeFormsModule
  ],
  declarations: [VendorManagementComponent]
})
export class VendorManagementModule { }
