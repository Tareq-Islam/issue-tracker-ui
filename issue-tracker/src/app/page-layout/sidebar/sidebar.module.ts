import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { CoreModule } from '@core/core/core.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule
  ],
  declarations: [SidebarComponent]
})
export class SidebarModule { }
