import { Component, ContentChild, Input, TemplateRef, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'eye-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent {
  @Input() appendTo: any;
  @Input() styleClass = 'drop-shadow-lg';

  @ContentChild(TemplateRef) overlayTemplate!: TemplateRef<any>;

  @ViewChild('overlaypanel') private overlay!: OverlayPanel;

  toggle(event: any, target?: any) {
    this.hide();
    this.overlay.toggle(event, target);
  }

  show(event: any, target?: any) {
    this.hide();
    this.overlay.show(event, target);
  }

  hide() {
    this.overlay.hide();
  }

}
