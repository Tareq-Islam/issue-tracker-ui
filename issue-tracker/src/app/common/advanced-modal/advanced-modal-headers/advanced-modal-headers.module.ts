import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancedModalHeadersComponent } from './advanced-modal-headers.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule
  ],
  declarations: [AdvancedModalHeadersComponent],
  exports: [AdvancedModalHeadersComponent]
})
export class AdvancedModalHeadersModule { }
