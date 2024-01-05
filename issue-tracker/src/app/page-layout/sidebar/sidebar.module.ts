import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { RouterModule } from '@angular/router';
import { ScrollLayoutModule } from '@scroll-layout/scroll-layout.module';
import { SharedModule } from '@shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { MenusComponent } from './menus/menus.component';

@NgModule({
  imports: [CommonModule, RouterModule, SharedModule, ScrollLayoutModule],
  declarations: [SidebarComponent, FooterComponent, MenusComponent],
  exports: [SidebarComponent],
})
export class SidebarModule {}
