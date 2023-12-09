import { SkeletonComponent } from './skeleton/skeleton.component';
import { ItemComponent } from './item/item.component';
import { AccordionComponent } from './accordion/accordion.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemsComponent } from './list-items.component';
import { ItemsComponent } from './items/items.component';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@NgModule({
  imports: [
    CommonModule,
    SkeletonModule,
    ButtonModule,
    RippleModule,
    OverlayPanelModule
  ],
  declarations: [
    ListItemsComponent,
    AccordionComponent,
    ItemComponent,
    ItemsComponent,
    SkeletonComponent
  ],
  exports: [
    AccordionComponent,
    ItemComponent,
    ItemsComponent,
    SkeletonComponent,
  ],
})
export class ListItemsModule {}
