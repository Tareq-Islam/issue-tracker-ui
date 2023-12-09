import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SkeletonModule } from 'primeng/skeleton';
import { InfoComponent } from './info/info.component';
import { UserItemComponent } from './user-item.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayPanelModule,
    SkeletonModule,
    AvatarModule
  ],
  declarations: [UserItemComponent, InfoComponent],
  exports: [UserItemComponent]
})
export class UserItemModule { }
