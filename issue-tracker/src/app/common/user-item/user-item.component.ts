import { Component, Input, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'eye-user-item',
  templateUrl: './user-item.component.html'
})
export class UserItemComponent {
  @Input() userId: any;
  @ViewChild('op') overlayPanel!: OverlayPanel;
  show(event: any) {
    this.overlayPanel.show(event);
  }
}
