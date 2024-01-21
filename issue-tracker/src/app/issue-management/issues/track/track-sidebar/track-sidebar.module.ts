import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackSidebarComponent } from './track-sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from '@shared/shared.module';
import { EyeFormsModule } from '@forms/eye-forms.module';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { PopoverModule } from '@popover/popover.module';
import { ScrollLayoutModule } from '@scroll-layout/scroll-layout.module';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    TooltipModule,
    SharedModule,
    EyeFormsModule,
    ButtonModule,
    RippleModule,
    PopoverModule,
    ScrollLayoutModule,
  ],
  declarations: [TrackSidebarComponent],
  exports: [TrackSidebarComponent],
})
export class TrackSidebarModule {}
