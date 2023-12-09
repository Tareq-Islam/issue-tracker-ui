import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'eye-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
})
export class AutoCompleteComponent extends FieldType {
  public set value(v: any) {
    this.formControl.setValue(v);
  }

  public get value(): any {
    return this.formControl.value;
  }

  onSelectedItem($event: any, field?: any) {
    if (this.to.onSelect) {
      this.to.onSelect($event, field);
    }
  }
}
