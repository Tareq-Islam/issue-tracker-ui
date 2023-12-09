import { RippleModule } from 'primeng/ripple';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { NavMenuModule } from '@nav-menu/nav-menu.module';
import { ProfileModule } from '@profile/profile.module';

@NgModule({
  imports: [CommonModule, NavMenuModule, ProfileModule, RippleModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderModule {}
