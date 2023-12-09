import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportTabBarComponent } from './report-tab-bar.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule
  ],
  declarations: [ReportTabBarComponent],
  exports: [ReportTabBarComponent]
})
export class ReportTabBarModule { }
