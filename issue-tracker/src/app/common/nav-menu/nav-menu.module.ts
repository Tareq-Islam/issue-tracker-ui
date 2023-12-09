import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from './nav-menu.component';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [CommonModule, MenuModule, RippleModule, ButtonModule],
  declarations: [NavMenuComponent],
  exports: [NavMenuComponent],
})
export class NavMenuModule {}
