import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportHeaderComponent } from './report-header.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule, ButtonModule, RippleModule],
  declarations: [ReportHeaderComponent],
  exports: [ReportHeaderComponent],
})
export class ReportHeaderModule {}
