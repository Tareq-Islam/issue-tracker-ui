import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'eye-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
})
export class SkeletonComponent {
  _cols: any[] = new Array(8);
  _items: any[] = new Array(15);
  @Input() set rows(v: number) {
    this._items = [];
    this._items = new Array(v);
  }

  @Input() set cols(v: number) {
    this._cols = [];
    this._cols = new Array(v);
  }
}
