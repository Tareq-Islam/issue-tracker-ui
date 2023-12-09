import { Component, Input } from '@angular/core';

export interface OptionsSelector {
  id: number;
  name: string;
  visable?: boolean;
  command?: (event: any) => void;
}

@Component({
  selector: 'eye-options-selector',
  templateUrl: './options-selector.component.html',
  styleUrls: ['./options-selector.component.scss'],
})
export class OptionsSelectorComponent {
  items: OptionsSelector[] = [];
  @Input() scrollHeight = '200px';
  @Input() btnLabel = 'Customer';
  @Input() appendTo = 'body';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() set dropdownMenus(v: OptionsSelector[]) {
    this.items = v.filter((x) => x.visable);
  }

  onSelected(event: any) {
    const { originalEvent, value } = event;
    if (typeof value.command === 'function') {
      value.command(value);
    }
  }
}
