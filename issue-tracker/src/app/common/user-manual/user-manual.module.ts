import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollLayoutModule } from '@scroll-layout/scroll-layout.module';
import { SharedModule } from '@shared/shared.module';
// import { MarkdownModule } from 'ngx-markdown';
import { UserManualComponent } from './user-manual.component';

@NgModule({
  imports: [
    CommonModule,
    ScrollLayoutModule,
    // MarkdownModule.forRoot(),
    SharedModule,
  ],
  declarations: [UserManualComponent],
})
export class UserManualModule {}
