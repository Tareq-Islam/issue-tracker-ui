import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'eye-scroll-layout',
  templateUrl: './scroll-layout.component.html',
  styleUrls: ['./scroll-layout.component.scss'],
})
export class ScrollLayoutComponent {
  @Input() style!: any;
  @Input() styleClass!: string;
  @Input() scrollLayoutUniqId!: string;

  @Input() height = 'calc(100vh - 90px)';
  @Input() width = '100%';
  @Output() isScrolling = new EventEmitter<boolean>();
  @Output() defaultScroll = new EventEmitter<any>();
  scrollDistance = 2;
  throttle = 100;
  onScroll() {
    this.isScrolling.emit(true);
  }
}
