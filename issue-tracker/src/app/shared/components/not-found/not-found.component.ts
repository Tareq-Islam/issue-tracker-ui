import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'eye-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  _notFoundText = 'No Data Found!!!';
  @Input() textStyleClass: string = 'text-3xl text-gray-200 font-bold';
  @Input() wrapperStyleClass: string = 'flex items-center justify-center p-36';
  @Input() set message(v: string) {
    this._notFoundText = v;
  }
  constructor() {}
}
