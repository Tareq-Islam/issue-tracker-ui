import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancedModalComponent } from './advanced-modal.component';
import { AdvancedModalHeadersModule } from './advanced-modal-headers/advanced-modal-headers.module';
import { ScrollLayoutModule } from '@scroll-layout/scroll-layout.module';

@NgModule({
  imports: [
    CommonModule,
    AdvancedModalHeadersModule,
    ScrollLayoutModule
  ],
  declarations: [AdvancedModalComponent],
  exports: [AdvancedModalComponent],
})
export class AdvancedModalModule { }
