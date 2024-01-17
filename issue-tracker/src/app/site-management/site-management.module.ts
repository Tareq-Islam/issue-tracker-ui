import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteManagementComponent } from './site-management.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ListItemsModule } from '@list-item/list-items.module';
import { EyeMenuModule } from '@menu/eye-menu.module';
import { ScrollLayoutModule } from '@scroll-layout/scroll-layout.module';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { HeaderModule } from '@page-layout/header/header.module';
const routes: Routes = [
  {
    path: '',
    component: SiteManagementComponent
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
  ],
  declarations: [SiteManagementComponent]
})
export class SiteManagementModule { }
