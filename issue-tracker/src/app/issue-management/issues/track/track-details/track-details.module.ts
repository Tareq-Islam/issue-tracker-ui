import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { RippleModule } from 'primeng/ripple';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackDetailsComponent } from './track-details.component';
import { FileUploadModule } from 'primeng/fileupload';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { EyeMenuModule } from '@menu/eye-menu.module';
import { MenuModule } from 'primeng/menu';
import { PopoverModule } from '@popover/popover.module';
import { EyeFormsModule } from '@forms/eye-forms.module';
import { EyeIssueModule } from 'src/app/common/eye-issue/eye-issue.module';
@NgModule({
  imports: [
    CommonModule,
    FileUploadModule,
    RippleModule,
    SharedModule,
    FormsModule,
    LazyLoadImageModule,
    EyeMenuModule,
    MenuModule,
    PopoverModule,
    EyeFormsModule,
    EyeIssueModule,
  ],

  declarations: [TrackDetailsComponent],
  exports: [TrackDetailsComponent],
})
export class TrackDetailsModule {}
