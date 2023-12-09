import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdvancedModalHeaderMenu } from '../model/advanced-modal.model';

@Component({
  selector: 'eye-advanced-modal-headers',
  templateUrl: './advanced-modal-headers.component.html',
  styleUrls: ['./advanced-modal-headers.component.scss']
})
export class AdvancedModalHeadersComponent {
  selectedNav!: AdvancedModalHeaderMenu | null;
  items: AdvancedModalHeaderMenu[] = [];
  _headerTitle!: string;
  _headerSubTitle!: string;
  @Output() closeBtn = new EventEmitter();
  @Input() set headerName(v: string) {
    this._headerTitle = v;
  }
  @Input() titleStyleClass!: string;
  @Input() subTitleStyleClass!: string;
  @Input() set headerSubTitle(v: string) {
    this._headerSubTitle = v;
  }
  @Input() set menuSelected (v: AdvancedModalHeaderMenu | null) {
    this.selectedNav = v;
  };
  @Input() set menus (v: AdvancedModalHeaderMenu[]) {
    this.items = v.filter(x => {
      if (x.visible === undefined || x.visible) {
        return true;
      }
        return false;
    });
    if(!this.selectedNav) {
      this.selectedNav = this.items[0];
    }
  };
  @Input() headerWrapperClass = 'grid grid-cols-[10%,auto,5%] items-center pt-2';
  onNavSelect(item: AdvancedModalHeaderMenu) {
    this.selectedNav = item;
    if (item.command)
    item.command(item);
  }

}
