import { ChipModule } from 'primeng/chip';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { SharedModule } from '@shared/shared.module';
import { TrackHeaderComponent } from './track-header/track-header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackComponent } from './track.component';
import { TrackSidebarModule } from './track-sidebar/track-sidebar.module';
import { TrackDetailsModule } from './track-details/track-details.module';
import { TrackService } from './services/tracks.service';
import { ScrollLayoutModule } from '@scroll-layout/scroll-layout.module';
import { ListItemsModule } from '@list-item/list-items.module';
import { EyeMenuModule } from '@menu/eye-menu.module';
import { EyeFormsModule } from '@forms/eye-forms.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ButtonModule,
    RippleModule,
    ChipModule,
    TrackSidebarModule,
    TrackDetailsModule,
    ScrollLayoutModule,
    ListItemsModule,
    EyeMenuModule,
    EyeFormsModule,
    MultiSelectModule,
  ],
  declarations: [TrackComponent, TrackHeaderComponent],
  exports: [TrackComponent],
  providers: [{ provide: TrackService }],
})
export class TrackModule {}
