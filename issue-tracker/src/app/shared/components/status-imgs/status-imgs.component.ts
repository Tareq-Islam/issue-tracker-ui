import { Component, Input, OnInit } from '@angular/core';

export interface StatusImages {
  imgUrl: string;
  tooltip?: string;
  tooltipPosition?: string;
  visable?: boolean;
  styleClass?: string;
}

@Component({
  selector: 'eye-status-imgs',
  templateUrl: './status-imgs.component.html',
  styleUrls: ['./status-imgs.component.scss'],
})
export class StatusImgsComponent {
  @Input() wrapperClass!: string;
  @Input() contentClass!: string;
  _items!: StatusImages[];
  @Input() set items(v: StatusImages[]) {
    this._items = v.filter((x) => {
      if (x.visable !== undefined) {
        return x.visable;
      } else {
        return true;
      }
    });
  }

  constructor() {}
}
