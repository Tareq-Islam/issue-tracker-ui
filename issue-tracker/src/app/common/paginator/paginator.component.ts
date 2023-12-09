import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Paginator } from 'primeng/paginator';

export interface PaginatorOptions {
  styleClass?: string;
  row: number;
  totalRecords: number;
  first?: number;
  numberOfPageShow?: number;
  showFirstLastIcon?: boolean;
  pageChange: (page: number) => void;
}

@Component({
  selector: 'eye-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  @ViewChild('paginator', { static: true }) paginator!: Paginator;
  showCount = 0;
  totalShowCount = 0;
  _paginatorOptions!: PaginatorOptions;
  @Input() set paginatorOptions(v: PaginatorOptions) {
    this._paginatorOptions = v;
    this.showCount = this._paginatorOptions.row ? 1 : 0;
    this.totalShowCount = this._paginatorOptions.row
      ? this._paginatorOptions.row
      : 0;
    this.paginator.showFirstLastIcon =
      v.showFirstLastIcon !== undefined ? v.showFirstLastIcon : true;
  }

  @Input() set resetPage(event: any) {
    if (event) {
      this.paginator.changePageToFirst(event);
    }
  }

  paginate(event: any) {
    if (event) {
      this._paginatorOptions.pageChange(event.page + 1);
    }
    this.showCount = event.first + 1;
    this.totalShowCount =
      event.first + this._paginatorOptions.row >
      this._paginatorOptions.totalRecords
        ? this._paginatorOptions.totalRecords
        : event.first + this._paginatorOptions.row;
  }
}
