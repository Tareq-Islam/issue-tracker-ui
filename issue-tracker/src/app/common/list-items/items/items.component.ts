import { Component, Input } from '@angular/core';

@Component({
  selector: 'eye-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent {
  @Input() style!: string;
  @Input() styleClass!: string;
  @Input() contentClass!: string;
}
