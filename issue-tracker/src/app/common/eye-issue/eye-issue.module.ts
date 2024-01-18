import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EyeIssueComponent } from './eye-issue.component';
import { IssueItemComponent } from './issue-item/issue-item.component';
import { EyeFormsModule } from '@forms/eye-forms.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListItemsModule } from '@list-item/list-items.module';
import { EyeMenuModule } from '@menu/eye-menu.module';
import { ScrollLayoutModule } from '@scroll-layout/scroll-layout.module';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from '@shared/shared.module';
import { EyeIssueDoorStatusComponent } from './eye-issue-door-status/eye-issue-door-status.component';
import { IssueStatusIconsComponent } from './issue-status-icons/issue-status-icons.component';
import { IssueCommentOptionsComponent } from './issue-comment-options/issue-comment-options.component';
import { PopoverModule } from '@popover/popover.module';
import { IssueCommentComponent } from './issue-comment/issue-comment.component';
import { MenuModule } from 'primeng/menu';
import { LightboxModule } from 'ngx-lightbox';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ButtonModule,
    RippleModule,
    ChipModule,
    TooltipModule,
    FileUploadModule,
    EyeFormsModule,
    ListItemsModule,
    ScrollLayoutModule,
    LightboxModule,
    LazyLoadImageModule,
    MenuModule,
    EyeMenuModule,
    FontAwesomeModule,
    PopoverModule,
  ],
  declarations: [
    EyeIssueComponent,
    IssueItemComponent,
    EyeIssueDoorStatusComponent,
    IssueStatusIconsComponent,
    IssueCommentOptionsComponent,
    IssueCommentComponent,
  ],
  exports: [
    IssueItemComponent,
    EyeIssueDoorStatusComponent,
    IssueStatusIconsComponent,
    IssueCommentOptionsComponent,
    IssueCommentComponent,
  ],
})
export class EyeIssueModule {}
