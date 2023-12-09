import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from './popover.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@NgModule({
  imports: [
    CommonModule,
    OverlayPanelModule
  ],
  declarations: [PopoverComponent],
  exports: [PopoverComponent]
})
export class PopoverModule { }
