import { AdvanchedModalHeader } from '@advanced-modal/model/advanced-modal.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'eye-reports',
  templateUrl: './eye-reports.component.html',
  styleUrls: ['./eye-reports.component.scss']
})
export class EyeReportsComponent {
  _header!: AdvanchedModalHeader;
  @Input() set header(v: AdvanchedModalHeader) {
    this._header = v;
  };
  @Output() modalClose = new EventEmitter();
}
