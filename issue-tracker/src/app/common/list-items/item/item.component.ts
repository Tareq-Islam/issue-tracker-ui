import { Component, Input } from '@angular/core';

@Component({
  selector: 'eye-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() styleClass!: string;
  @Input() style!: string;
}
