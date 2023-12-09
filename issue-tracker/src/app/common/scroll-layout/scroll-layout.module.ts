import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollLayoutComponent } from './scroll-layout.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [CommonModule, InfiniteScrollModule],
  declarations: [ScrollLayoutComponent],
  exports: [ScrollLayoutComponent],
})
export class ScrollLayoutModule {}
