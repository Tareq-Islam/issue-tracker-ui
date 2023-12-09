import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EyeReportsComponent } from './eye-reports.component';
import { AdvancedModalModule } from '@advanced-modal/advanced-modal.module';
import { ReportHeaderModule } from './report-header/report-header.module';
import { ReportTabBarModule } from './report-tab-bar/report-tab-bar.module';

@NgModule({
  imports: [
    CommonModule,
    AdvancedModalModule,
    ReportHeaderModule,
    ReportTabBarModule
  ],
  declarations: [EyeReportsComponent],
  exports: [EyeReportsComponent]
})
export class EyeReportsModule { }
