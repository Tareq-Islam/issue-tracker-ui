import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersManagementComponent } from './users-management.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { ListItemsModule } from '@list-item/list-items.module';
import { EyeMenuModule } from '@menu/eye-menu.module';
import { ScrollLayoutModule } from '@scroll-layout/scroll-layout.module';
import { RippleModule } from 'primeng/ripple';
import { HeaderModule } from '@page-layout/header/header.module';

const routes: Routes = [
  {
    path: '',
    component: UsersManagementComponent
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
  declarations: [UsersManagementComponent]
})
export class UsersManagementModule { }
