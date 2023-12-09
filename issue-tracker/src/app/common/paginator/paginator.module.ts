import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator.component';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  imports: [CommonModule, PaginatorModule],
  declarations: [PaginatorComponent],
  exports: [PaginatorComponent],
})
export class EyePaginatorModule {}
