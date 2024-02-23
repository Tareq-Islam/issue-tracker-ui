import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssuesComponent } from './issues.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ChipModule } from 'primeng/chip';
import { TooltipModule } from 'primeng/tooltip';
import { EyeFormsModule } from '@forms/eye-forms.module';
import { ListItemsModule } from '@list-item/list-items.module';
import { ScrollLayoutModule } from '@scroll-layout/scroll-layout.module';
import { EyeMenuModule } from '@menu/eye-menu.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EyeIssueModule } from 'src/app/common/eye-issue/eye-issue.module';
import { BadgeModule } from 'primeng/badge';
import { TrackModule } from './track/track.module';
import { IssueCreateComponent } from './issue-create/issue-create.component';
const routes: Routes = [
  {
    path: '',
    component: IssuesComponent,

  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ButtonModule,
    RippleModule,
    ChipModule,
    TooltipModule,
    TrackModule,
    EyeFormsModule,
    ListItemsModule,
    ScrollLayoutModule,
    EyeMenuModule,
    FontAwesomeModule,
    EyeIssueModule,
    BadgeModule,
  ],
  declarations: [IssuesComponent, IssueCreateComponent]
})
export class IssuesModule { }
