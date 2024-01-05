import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'eye-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() isModalOpen = false;
  @Input() isModalFooter = false;
  @Input() modalPosition: any = 'top';
  @Input() closeOnEscape = false;
  @Input() style: any = { width: '625px', maxHeight: '95%' };
  @Input() breakpoints!: any;
  @Output() modalClose = new EventEmitter();
  constructor() {}
}
