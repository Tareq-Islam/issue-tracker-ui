import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AdvanchedModalContent, AdvanchedModalHeader } from './model/advanced-modal.model';

@Component({
  selector: 'eye-advanced-modal',
  templateUrl: './advanced-modal.component.html',
  styleUrls: ['./advanced-modal.component.scss']
})
export class AdvancedModalComponent {
  @Input() header!: AdvanchedModalHeader;
  @Input() content!: AdvanchedModalContent;
  @Output() clickClose = new EventEmitter();
}
