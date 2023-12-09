import { QuickMenuTabComponent } from './quick-menu-tab/quick-menu-tab.component';
import { RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EyeMenuComponent } from './eye-menu.component';
import { QuickMenuComponent } from './quick-menu/quick-menu.component';
import { ItemMenuComponent } from './item-menu/item-menu.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  imports: [CommonModule, MenuModule, RouterModule, ButtonModule, RippleModule],
  declarations: [EyeMenuComponent, QuickMenuComponent, ItemMenuComponent, QuickMenuTabComponent],
  exports: [QuickMenuComponent, ItemMenuComponent, QuickMenuTabComponent],
})
export class EyeMenuModule {}
